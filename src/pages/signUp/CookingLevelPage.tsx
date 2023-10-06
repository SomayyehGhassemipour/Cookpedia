import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { List } from "../../sharedComponents/list/List";
import { ListItem } from "../../sharedComponents/list/ListItem";
import { ProgressBar } from "../../sharedComponents/ProgressBar";
import { setUserCookLevel } from "../../redux/features/users/currentUserSlice";
import mockData from "../../data/mockData.json";

export const CookingLevelPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLevel, setselectedLevel] = useState<string>("");
  const cookingLevel = mockData.cookingLevel;
  const selectLevel = (event: React.MouseEvent<HTMLElement>) => {
    setselectedLevel(event.currentTarget.id);
  };
  const countinueFn = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(setUserCookLevel({ cookLevel: selectedLevel }));
    navigate("/signup-personal-data");
  };
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-around">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/signup-country")}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={50} />
          </div>
        </Header>
        <CardBody classname="flex-align-start">
          <h1>What is your cooking level?</h1>
          <label>
            Please select your cooking levelfor a better recommendations.
          </label>
          <List>
            {cookingLevel.map((level) => (
              <ListItem
                key={level.title}
                align="vertical"
                id={level.title}
                selected={level.title === selectedLevel ? true : false}
                onClick={selectLevel}
              >
                <h4>{level.title}</h4>
                <p>{level.description}</p>
              </ListItem>
            ))}
          </List>
        </CardBody>
        <CardAction>
          <Button
            data_bg="primary"
            data_type="container"
            clickHandler={countinueFn}
          >
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
