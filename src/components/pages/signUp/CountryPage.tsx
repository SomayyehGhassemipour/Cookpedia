import { Card } from "../../utilities/card/Card"
import { CardBody } from "../../utilities/card/CardBody"
import { Header } from "../../utilities/Header"
import { ProgressBar } from "../../utilities/ProgressBar"
import { TextField } from "../../utilities/TextField"
import { Button } from "../../utilities/Button"
import { useNavigate } from "react-router-dom"
import { List } from "../../utilities/list/List"
import { ListItem } from "../../utilities/list/ListItem"
import { Icon } from "../../utilities/Icon"
import { Avatar } from "../../utilities/Avatar"
import { CardAction } from "../../utilities/card/CardAction"
import data from '../../../data/allCountries.json';
import { useState } from "react"

export const CountryPage = () => {
  let navigate = useNavigate();
  const [searchItem, setSearchItem] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setSearchItem(e.target.value);
  }
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
        <div className="flex-row">
          <Button type={'icon'} clickHandler={()=>navigate("/")}>
            <Icon name="back"/>
          </Button>
          <ProgressBar progress={20}/>
        </div>
        </Header>
        <CardBody>
          <h1>Which country are you from?</h1>
          <label >Please select your country of origin for a better recommendations.</label>
          <TextField type="text" data_type="search" placeholder={"Search Country"} onChange={handleOnChange}/>
          <List>
          {data.filter(country => country.name.toLowerCase().startsWith(searchItem.toLowerCase())).map((item, index) => ( 
            <ListItem align="horizontal" id={String(index)} >
              <Avatar classname={"avatar-image"} url={item.image} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">{item.code}</h5>
              <h5>{item.name}</h5>
            </ListItem>
          ))}
          </List>
        </CardBody>
        <CardAction>
          <Button type={'primary'} clickHandler={()=>navigate("/signup-cooking")}>
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}