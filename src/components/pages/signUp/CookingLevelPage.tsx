import { useNavigate } from "react-router-dom"
import { Button } from "../../utilities/Button"
import { Card } from "../../utilities/card/Card"
import { CardAction } from "../../utilities/card/CardAction"
import { CardBody } from "../../utilities/card/CardBody"
import { Header } from "../../utilities/Header"
import { Icon } from "../../utilities/Icon"
import { ProgressBar } from "../../utilities/ProgressBar"

export const CookingLevelPage  = () => {
  let navigate = useNavigate();
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
        <div className="flex-row">
          <Button type={'icon'} clickHandler={()=>navigate("/signup-country")}>
            <Icon name="back"/>
          </Button>
          <ProgressBar progress={20}/>
        </div>
        <h1>What is your cooking level?</h1>
        </Header>
        <CardBody>
          <label >Please select your cooking levelfor a better recommendations.</label>
        </CardBody>
        <CardAction>
          <Button type={'primary'} clickHandler={()=>navigate("/")}>
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}