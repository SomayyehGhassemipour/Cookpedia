import { Card } from "../../sharedComponents/card/Card";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { ProgressBar } from "../../sharedComponents/ProgressBar";
import { InputField } from "../../sharedComponents/InputField";
import { Button } from "../../sharedComponents/Button";
import { useNavigate } from "react-router-dom";
import { List } from "../../sharedComponents/list/List";
import { ListItem } from "../../sharedComponents/list/ListItem";
import { Icon } from "../../sharedComponents/Icon";
import { Avatar } from "../../sharedComponents/Avatar";
import { CardAction } from "../../sharedComponents/card/CardAction";
import data from "../../data/allCountries.json";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserCountry } from "../../redux/features/users/currentUserSlice";
import MESSAGES from "../../data/message.json";

export const CountryPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [searchItem, setSearchItem] = useState<string>("");
  const [selectedCountry, setselectedCountry] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedCountry("");
    setSearchItem(event.target.value);
  };

  const selectCountryFn = (event: React.MouseEvent<HTMLElement>) => {
    setselectedCountry(event.currentTarget.id);
    setSearchItem(event.currentTarget.id);
  };

  const countinueFn = () => {
    if (!selectedCountry) alert(MESSAGES.SELECT_COUNTRY);
    else {
      dispatch(setUserCountry({ country: selectedCountry }));
      navigate("/signup-cooking");
    }
  };
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-around">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate(-1)}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={20} />
          </div>
        </Header>
        <CardBody classname="flex-align-start">
          <h1>Which country are you from?</h1>
          <label>
            Please select your country of origin for a better recommendations.
          </label>
          <InputField
            type="text"
            name="search-input"
            data_type="input"
            data_icon="search"
            placeholder="Search Country"
            value={searchItem}
            onChange={handleOnChange}
          />
          <List>
            {data
              .filter((country) =>
                country.name.toLowerCase().startsWith(searchItem.toLowerCase())
              )
              .map((item) => (
                <ListItem
                  key={item.name}
                  align="horizontal"
                  id={item.name}
                  onClick={selectCountryFn}
                  selected={item.name === selectedCountry ? true : false}
                >
                  <Avatar
                    classname="avatar-image"
                    image={item.image}
                    name={item.code}
                    type={"rectangle"}
                    size={"sm"}
                  />
                  <h5 className="text-neutral-400">{item.code}</h5>
                  <h5>{item.name}</h5>
                </ListItem>
              ))}
          </List>
        </CardBody>
        <CardAction>
          <Button
            data_type="container"
            data_bg="primary"
            clickHandler={countinueFn}
          >
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
