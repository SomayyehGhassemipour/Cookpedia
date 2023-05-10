import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../../utilities/Button"
import { Card } from "../../utilities/card/Card"
import { CardAction } from "../../utilities/card/CardAction"
import { CardBody } from "../../utilities/card/CardBody"
import { Header } from "../../utilities/Header"
import { Icon } from "../../utilities/Icon"
import { List } from "../../utilities/list/List"
import { ListItem } from "../../utilities/list/ListItem"
import { ProgressBar } from "../../utilities/ProgressBar"
import { setUserCookLevel } from "../../../redux/features/user/currentUserSlice"

export const CookingLevelPage  = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedLevel, setselectedLevel] = useState<string>("");
  const cookingLevel = [
    {
      title: "Novice",
      description: "Basic understainding of kitchen tools and basic cooking techniques such as boiling, and friying."
    },
    {
      title: "Intermediate",
      description: "Ability to follow recipes, prepare simple dishes, and basic knife skills."
    },
    {
      title: "Advanced",
      description: "underestanding of cooking principles, create recipes and proficiency in various cooking techniques such as baking, grilling, and roasting."
    },
    {
      title: "Professional",
      description: "Expert with extensive education, training, and experience in cooking techniques, menu planing, and kitchen management."
    },
  ]
  const selectLevel = (e: React.MouseEvent<HTMLElement>) => {
    setselectedLevel(e.currentTarget.id);
  }
  const countinueFn = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setUserCookLevel({'cookLevel' : selectedLevel}));
    navigate("/signup-personal-data");
  }
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
        <div className="flex-row-justify-around">
          <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/signup-country")}>
            <Icon name="back" size='lg'/>
          </Button>
          <ProgressBar progress={50}/>
        </div>
        </Header>
        <CardBody>
          <h1>What is your cooking level?</h1>
          <label >Please select your cooking levelfor a better recommendations.</label>
          <List>
          {cookingLevel.map((level) => ( 
            <ListItem key={level.title} 
                      align="vertical" 
                      id={level.title} 
                      selected={level.title === selectedLevel? true : false} 
                      onClick={selectLevel}>
              <h4>{level.title}</h4>
              <p>{level.description}</p>
            </ListItem>
          ))}
          </List>
        </CardBody>
        <CardAction>
          <Button data_bg={'primary'}  data_type={'container'} clickHandler={countinueFn}>
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}