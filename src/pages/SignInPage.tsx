import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../redux/firebase";
import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { CardAction } from "../sharedComponents/card/CardAction";
import { CardBody } from "../sharedComponents/card/CardBody";
import { CheckBox } from "../sharedComponents/CheckBox";
import { FieldSet } from "../sharedComponents/form/FieldSet";
import { Form } from "../sharedComponents/form/Form";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import { ProgressBar } from "../sharedComponents/ProgressBar";

export const SignInPage: React.FC = () => {
  const [state, setstate] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const { email, password } = state;

  const inputs = [
    {
      id: "1",
      label: "Email",
      placeholdertxt: "Email",
      inputType: "email",
      name: "email",
      value: email,
      errorMessage: "It should be a valid email address.",
      required: true,
    },
    {
      id: "2",
      label: "Password",
      placeholdertxt: "Password",
      inputType: "password",
      name: "password",
      value: password,
      errorMessage: "The password you’ve entered is incorrect.",
      required: true,
    },
  ];

  let navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    console.log("submited", email, password);

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
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  const checkboxChangeHandler = () => {
    setstate({ ...state, rememberMe: !state.rememberMe });
  };
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-around">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/")}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={100} />
          </div>
        </Header>
        <CardBody>
          <h1>Hello there</h1>
          <p>Please Enter your username/email & password to sign in.</p>
          <Form id="myform" onSubmit={submitHandler}>
            {inputs.map((input) => (
              <FieldSet key={input.id} {...input} onChange={changeHandler} />
            ))}
            <CheckBox
              label="Remember me"
              checked={state.rememberMe}
              onChange={checkboxChangeHandler}
            />
            <LineSeperator type="horizontal" />
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/signup-create-account")}
            >
              <h5 className="text-primary-500">Forget Password</h5>
            </Button>
            <LineSeperator type="horizontal" content="or continue with" />
            <div className="flex-column-center">
              <div className="flex-row-justify-around">
                <Button
                  data_type="container"
                  data_bg="transparent"
                  clickHandler={() => navigate("/")}
                >
                  <div
                    style={{
                      backgroundImage: "url(icons8-google-28.png)",
                      height: 28,
                      width: 28,
                    }}
                  />
                </Button>
                <Button
                  data_type="container"
                  data_bg="transparent"
                  clickHandler={() => navigate("/")}
                >
                  <div
                    style={{
                      backgroundImage: "url(icons8-facebook-28.png)",
                      height: 28,
                      width: 28,
                    }}
                  />
                </Button>
                <Button
                  data_type="container"
                  data_bg="transparent"
                  clickHandler={() => navigate("/")}
                >
                  <div
                    style={{
                      backgroundImage: "url(icons8-apple-logo-28.png)",
                      height: 28,
                      width: 28,
                    }}
                  />
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
        <CardAction>
          <Button form="myform" data_type="container" data_bg="primary">
            <p>Sign In</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
