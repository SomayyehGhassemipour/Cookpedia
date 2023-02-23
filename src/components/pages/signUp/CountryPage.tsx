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

export const CountryPage = () => {
  let navigate = useNavigate();
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
        <h1>Which country are you from?</h1>
        </Header>
        <CardBody>
          <label >Please select your country of origin for a better recommendations.</label>
          <TextField textholder={"Search Country"}/>
          <List>
            <ListItem align="horizontal">
              <Avatar url={"Flag_of_Andorra.svg.webp"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AD</h5>
              <h5>Andorra</h5>
            </ListItem>
            <ListItem align="horizontal">
              <Avatar url={"flag-of-Afghanistan.png"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AF</h5>
              <h5>Afghanistan</h5>
            </ListItem>
            <ListItem align="horizontal">
              <Avatar url={"Flag_of_Albania.svg.webp"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AL</h5>
              <h5>Albania</h5>
            </ListItem>
            <ListItem align="horizontal">
              <Avatar url={"Flag_of_Antigua_and_Barbuda.svg.png"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AG</h5>
              <h5>Antigua And Barbuda</h5>
            </ListItem>
            <ListItem align="horizontal">
              <Avatar url={"Flag_of_Andorra.svg.webp"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AD</h5>
              <h5>Andorra</h5>
            </ListItem>
            <ListItem align="horizontal">
              <Avatar url={"flag-of-Afghanistan.png"} name={"AC"} type={"avatar-rectangle"} />
              <h5 className="text-neutral-400">AF</h5>
              <h5>Afghanistan</h5>
            </ListItem>
            <Button type={'primary'} clickHandler={()=>navigate("/")}>
              <p>Continue</p>
            </Button>
          </List>
        </CardBody>
      </Card>
    </div>
  )
}