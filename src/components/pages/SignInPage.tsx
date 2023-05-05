import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../redux/firebase"
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

export const SignInPage : React.FC = () => {
  console.log(auth?.currentUser?.displayName);
  const [state, setstate] = useState({
    email:"",
    password: "",
  });
  const {email, password} = state;

  const inputs = [
    {
      id: '1',
      label: "Email", 
      placeholdertxt: "Email",
      inputType: "email",
      name: "email" ,
      value: email,
      errorMessage: "It should be a valid email address.",
      required: true
    },
    {
      id: '2',
      label: "Password", 
      placeholdertxt: "Password",
      inputType: "password",
      name: "password" ,
      value: password,
      errorMessage: "The password you’ve entered is incorrect.",
      required: true
    }
  ]

  let navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    console.log("submited",email, password);

    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/profile");
    console.log(user);
    // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    let {name, value} = e.target;
    setstate({...state, [name]: value});
  }

  return (
    <div className="container">
      <Card classname={"flex-justify-start"}>
        <Header>
          <div className="flex-row-justify-around">
            <Button data_type={'container'} data_bg={'transparent'} clickHandler={() => navigate("/")}>
              <Icon name="back"/>
            </Button>
            <ProgressBar progress={100}/>
          </div>
        </Header>
        <CardBody>
          <h1>Hello there</h1>
          <p>Please Enter your username/email & password to sign in.</p>   
          <Form id="myform" onSubmit={submitHandler}>
            <>
            {inputs.map((input) => 
              <FieldSet key={input.id} {...input} onChange={changeHandler} />
            )}
            <CheckBox label={"Remember me"}/>
            <LineSeperator type="horizontal"/>
            <Button data_type="container" data_bg={'transparent'} clickHandler={()=>navigate("/signup-create-account")}>
              <h5 className="text-primary-500">Forget Password</h5>
            </Button>
            <LineSeperator type="horizontal" content={"or continue with"}/>
            <div className="flex-column-center">
              <div className="flex-row-justify-around">
                <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/")}>
                  <div style={{backgroundImage:  "url(icons8-google-28.png)", height:28, width:28}} />
                </Button>
                <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/")}>
                  <div style={{backgroundImage:  "url(icons8-facebook-28.png)", height:28, width:28}} />
                </Button>
                <Button data_type={'container'} data_bg={'transparent'} clickHandler={()=>navigate("/")}>
                  <div style={{backgroundImage:  "url(icons8-apple-logo-28.png)", height:28, width:28}} />
                </Button>
              </div>
            </div>
            </>
          </Form>
        </CardBody>
        <CardAction>
        <Button form="myform"  data_type={'container'} data_bg={'primary'} type='submit'>
            <p>Sign In</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  )
}