import { useState } from "react"
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
import { auth } from "../../../redux/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export const CreateAccountPage : React.FC = () => {
  
  const [state, setState] = useState({
    displayName: "",
    email:"",
    password: "",
    passwordConfirm: ""
  });
  const {displayName,email, password,passwordConfirm} = state;

  const inputs = [
    {
      id: '1',
      label: "Username",
      placeholdertxt: "Username",
      inputType: "text",
      name: "displayName",
      value: displayName,
      errorMessage: "Username should be 3-16 characters.",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: '2',
      label: "Email", 
      placeholdertxt: "Email",
      inputType: "email",
      name: "email" ,
      value: email,
      errorMessage: "It should be a valid email address.",
      required: true
    },
    {
      id: '3',
      label: "Password", 
      placeholdertxt: "Password",
      inputType: "password",
      name: "password" ,
      value: password,
      errorMessage: "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character.",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true
    },
    {
      id: '4',
      label: "Confirm Password", 
      placeholdertxt: "Password",
      inputType: "password",
      name: "passwordConfirm" ,
      value: passwordConfirm,
      errorMessage: "Passwords don't match.",
      pattern: state.password,
      required: true
    }
  ]
  
  let navigate = useNavigate();

  const submitHandler = async (e:any) => {
    console.log("sdcsc",displayName);
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // const user = auth.currentUser;
            updateProfile(user, {
              displayName: displayName
            }).then(() => {
              // Profile updated!
              console.log(auth.currentUser?.displayName);
              
              // ...
            }).catch((error) => {
              console.log(error);
              // An error occurred
              // ...
            });

            navigate("/signin");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });

    setState({displayName:"", email:"", password:"", passwordConfirm:""});
  }

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    let {name, value} = e.target;
    setState({...state, [name]: value});
  };


  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row-justify-around">
            <Button data_type={'container'} data_bg={'transparent'} clickHandler={() => navigate("/signup-personal-data")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
        </Header>
        <CardBody>
          <h1>Create an Account</h1>
          <p >Enter your username, email & password. If you forget it, then you have to do forgot password.</p>   
          <Form id="myform" onSubmit={submitHandler}>
            {inputs.map((input) => 
              <FieldSet key={input.id} {...input} onChange={changeHandler} />
            )}
          </Form>
        </CardBody>
        <CardAction>
          <Button form="myform"  data_type={'container'} data_bg={'primary'} type='submit'>
            <p>Sign Up</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}