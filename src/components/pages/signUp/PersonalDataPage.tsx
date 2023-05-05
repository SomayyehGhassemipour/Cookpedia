import { useNavigate } from "react-router-dom"
import { Avatar } from "../../utilities/Avatar"
import { Button } from "../../utilities/Button"
import { Card } from "../../utilities/card/Card"
import { CardAction } from "../../utilities/card/CardAction"
import { CardBody } from "../../utilities/card/CardBody"
import { Form } from "../../utilities/form/Form"
import { FieldSet } from "../../utilities/form/FieldSet"
import { Header } from "../../utilities/Header"
import { Icon } from "../../utilities/Icon"
import { ProgressBar } from "../../utilities/ProgressBar"
import { SelectInput } from "../../utilities/SelectInput"



export const PersonalDataPage = () => {

  let navigate = useNavigate(); 

  const submitHandler = () => {
    console.log("submited");
  }
  const options = ["gender","male", "female","other"];
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row-justify-around">
            <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/signup-cooking")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={75}/>
          </div>
        </Header>
        <CardBody>
          <h1>Compelete Your Profile</h1>
          <label >Don't worry, only you can see your personal data. No one else will be able to see it.                    </label>   
          <div className="flex-row-justify-around">
            <div className="profile-avatar">
              <Avatar classname={"avatar-profile"} url={"user.png"} name={"AC"} type={"avatar-circle"} />
                <div className="edit-avatar">
                  <Icon name="edit"/>
                </div>
            </div>
          </div>
          <Form onSubmit={submitHandler}>
            <FieldSet label={"Full Name"} placeholdertxt="Full Name" inputType="text" />
            <FieldSet label={"Phone Number"} placeholdertxt="+1 000 000 000" inputType="phone" />
            <SelectInput label={"Gender"} name="gender" placeholdertxt="Gender" options={options}/>            
            <FieldSet label={"Date of Birth"} placeholdertxt="MM/DD?YYYY" inputType="date" />
          </Form>
        </CardBody>
        <CardAction>
          <Button  data_type={'container'} data_bg={'primary'} clickHandler={()=>navigate("/signup-create-account")}>
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}