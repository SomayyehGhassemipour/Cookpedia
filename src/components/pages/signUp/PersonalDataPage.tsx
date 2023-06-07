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
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUserPersonalData } from '../../../redux/features/users/currentUserSlice'


export const PersonalDataPage = () => {

  let navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [state, setState] = useState({
    fullname: "",
    phoneNumber:"",
    birthday: "",
    gender: ""
  });
  const {fullname,phoneNumber, birthday,gender} = state;

  const inputs = [
    {
      id: '1',
      label: "Full Name",
      placeholdertxt: "Full Name",
      inputType: "text",
      name: "fullname",
      value: fullname,
      errorMessage: "Username should be 3-16 characters.",
      pattern: "^[A-Za-z ]{3,16}$",
      required: true
    },
    {
      id: '2',
      label: "Phone Number", 
      placeholdertxt: "+1 000 000 000",
      inputType: "phone",
      name: "phoneNumber" ,
      value: phoneNumber,
      errorMessage: "It should be a valid number.",
      pattern: "^[0-9+]{12}$",
      required: true
    },
    {
      id: '3',
      label: "Date of Birth", 
      placeholdertxt: "MM/DD?YYYY",
      inputType: "date",
      name: "birthday" ,
      value: birthday,
      errorMessage: "Please put your birthday",
      required: true
    },
    {
      id: '4',
      label: "Gender", 
      placeholdertxt: "Gender",
      inputType: "select",
      name: "gender" ,
      value: gender,
      errorMessage: "Please select the gender.",
      options : ["gender","male", "female","other"],
      required: true
    }
  ]
  
  const submitHandler = () => {
    dispatch(setUserPersonalData(state));
    console.log("submited");
    navigate("/signup-create-account");
  }
  const changeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    console.log(e.target.value);
    let {name, value} = e.target;
    setState({...state, [name]: value});
  };
  const options = ["gender","male", "female","other"];
  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row-justify-around">
            <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/signup-cooking")}>
              <Icon name="back" size="lg"/>
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
                  <Icon name="edit" size="sm"/>
                </div>
            </div>
          </div>
          <Form id="myForm" onSubmit={submitHandler}>
          {inputs.map((input) => (
            input.name ==="gender"
              ?<SelectInput key={input.id} label={"Gender"} name="gender" placeholdertxt="Gender" options={options} onChange={changeHandler}/>
              :<FieldSet key={input.id} {...input} onChange={changeHandler} />
            ))}
          </Form>
        </CardBody>
        <CardAction>
          <Button  form="myForm" data_type={'container'} data_bg={'primary'} type="submit">
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}