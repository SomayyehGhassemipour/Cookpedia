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
import { createUserWithEmailAndPassword } from "firebase/auth"

export const CreateAccountPage : React.FC = () => {
  console.log(auth?.currentUser?.email);
  const [state, setState] = useState({
    displayName: "",
    email:"",
    password: "",
    passwordConfirm: ""
  });
  const {displayName,email, password,passwordConfirm} = state;
  
  let navigate = useNavigate();

  const submitHandler = async (e:any) => {
    console.log("submited");
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/home");
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
          <div className="flex-row">
            <Button data_type={'icon'} clickHandler={() => navigate("/signup-personal-data")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
        </Header>
        <CardBody>
          <h1>Create an Account</h1>
          <p >Enter your username, email & password. If you forget it, then you have to do forgot password.</p>   
          <Form id="myform" onSubmit={submitHandler}>
            <FieldSet label={"Username"} placeholdertxt="Username" inputType="text" name="username" value={displayName} onChange={changeHandler}/>
            <FieldSet label={"Email"} placeholdertxt="Email" inputType="email" name="email" value={email} onChange={changeHandler}/>
            <FieldSet label={"Password"} placeholdertxt="Password" inputType="password" name="password" value={password} onChange={changeHandler}/>
            <FieldSet label={"Confirm Password"} placeholdertxt="Confirm Password" inputType="password" name="passwordConfirm" value={passwordConfirm} onChange={changeHandler}/>
            {/* <CheckBox label={"Remember me"}/> */}
          </Form>
        </CardBody>
        <CardAction>
          <Button form="myform" data_type={'primary'} type='submit'>
            <p>Sign Up</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}