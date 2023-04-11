import { useNavigate } from "react-router-dom"
import { Button } from "../../utilities/Button"
import { Card } from "../../utilities/card/Card"
import { CardAction } from "../../utilities/card/CardAction"
import { CardBody } from "../../utilities/card/CardBody"
import { CheckBox } from "../../utilities/CheckBox"
import { FieldSet } from "../../utilities/form/FieldSet"
import { Form } from "../../utilities/form/Form"
import { Header } from "../../utilities/Header"
import { Icon } from "../../utilities/Icon"
import { ProgressBar } from "../../utilities/ProgressBar"

interface Props {

}
export const CreateAccountPage : React.FC<Props> = ({}) => {
  let navigate = useNavigate();
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row">
            <Button type={'icon'} clickHandler={()=>navigate("/signup-personal-data")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
        </Header>
        <CardBody>
          <h1>Create an Account</h1>
          <p >Enter your username, email & password. If you forget it, then you have to do forgot password.</p>   
          <Form>
            <FieldSet label={"Username"} placeholdertxt="Username" inputType="text" />
            <FieldSet label={"Email"} placeholdertxt="Email" inputType="email" />
            <FieldSet label={"Password"} placeholdertxt="Password" inputType="password" />
            <FieldSet label={"Confirm Password"} placeholdertxt="Confirm Password" inputType="password" />
            <CheckBox label={"Remember me"}/>
          </Form>
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