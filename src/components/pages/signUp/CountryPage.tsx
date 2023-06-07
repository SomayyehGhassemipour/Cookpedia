import { Card } from "../../utilities/card/Card"
import { CardBody } from "../../utilities/card/CardBody"
import { Header } from "../../utilities/Header"
import { ProgressBar } from "../../utilities/ProgressBar"
import { InputField } from "../../utilities/InputField"
import { Button } from "../../utilities/Button"
import { useNavigate } from "react-router-dom"
import { List } from "../../utilities/list/List"
import { ListItem } from "../../utilities/list/ListItem"
import { Icon } from "../../utilities/Icon"
import { Avatar } from "../../utilities/Avatar"
import { CardAction } from "../../utilities/card/CardAction"
import data from '../../../data/allCountries.json'
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { setUserCountry } from '../../../redux/features/users/currentUserSlice'

export const CountryPage = () => {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedCountry, setselectedCountry] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setselectedCountry("");
    setSearchItem(e.target.value);
  }

  const selectCountryFn = (e: React.MouseEvent<HTMLElement>) => {
    setselectedCountry(e.currentTarget.id);
    setSearchItem(e.currentTarget.id);
  }

  const countinueFn = (e: React.MouseEvent<HTMLElement>) => {
    if(!selectedCountry) alert("Please select a country.")
    else {
      dispatch(setUserCountry({'country': selectedCountry}));
      navigate("/signup-cooking")
    }
  }
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
        <div className="flex-row-justify-around">
          <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/")}>
            <Icon name="back" size="lg"/>
          </Button>
          <ProgressBar progress={20}/>
        </div>
        </Header>
        <CardBody>
          <h1>Which country are you from?</h1>
          <label >Please select your country of origin for a better recommendations.</label>
          <InputField type="text" data_type="input" data_icon="search" placeholder={"Search Country"} value={searchItem} onChange={handleOnChange}/>
          <List>
          {data.filter(country => country.name.toLowerCase().startsWith(searchItem.toLowerCase())).map((item) => ( 
            <ListItem key={item.name} align="horizontal" id={item.name} onClick={selectCountryFn} selected={item.name === selectedCountry? true : false}>
              <Avatar classname={"avatar-image"} url={item.image} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">{item.code}</h5>
              <h5>{item.name}</h5>
            </ListItem>
          ))}
          </List>
        </CardBody>
        <CardAction>
          <Button data_type={'container'} data_bg={'primary'} clickHandler={countinueFn}>
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}