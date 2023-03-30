import { useNavigate } from "react-router-dom"
import { Button } from "../utilities/Button"
import { Card } from "../utilities/card/Card"
import { CardAction } from "../utilities/card/CardAction"
import { CardBody } from "../utilities/card/CardBody"
import { CheckBox } from "../utilities/CheckBox"
import { FieldSet } from "../utilities/form/FieldSet"
import { Form } from "../utilities/form/Form"
import { Header } from "../utilities/Header"
import { Icon } from "../utilities/Icon"
import { LineSeperator } from "../utilities/LineSeperator"
import { ProgressBar } from "../utilities/ProgressBar"

interface Props {

}
export const SignInPage : React.FC<Props> = ({}) => {
  let navigate = useNavigate();
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row">
            <Button type={'icon'} clickHandler={()=>navigate("/signup-create-account")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
          <h1>Hello there</h1>
        </Header>
        <CardBody>
          <p >Please Enter your username/email & password to sign in.</p>   
          <Form>
            <FieldSet label={"Username / Email"} placeholdertxt="Username" inputType="text" />
            <FieldSet label={"Password"} placeholdertxt="Password" inputType="password" />
            <CheckBox label={"Remember me"}/>
            <LineSeperator content={"or continue with"}/>
            <p>or continue with</p>
            <div className="flex-row">
              <Button type={'container'} clickHandler={()=>navigate("/")}>
                <div style={{backgroundImage:  "url(" + "icons8-google-28.png" + ")", height:28, width:28}} />
              </Button>
              <Button type={'container'} clickHandler={()=>navigate("/")}>
                <div style={{backgroundImage:  "url(" + "icons8-facebook-28.png" + ")", height:28, width:28}} />
              </Button>
              <Button type={'container'} clickHandler={()=>navigate("/")}>
                <div style={{backgroundImage:  "url(" + "icons8-apple-logo-28.png" + ")", height:28, width:28}} />
              </Button>
            </div>
          </Form>
        </CardBody>
        <CardAction>
          <Button type={'primary'} clickHandler={()=>navigate("/")}>
            <p>Sign In</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}