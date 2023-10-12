import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useUserAuth } from "../sevices/firebase/AthenicationService";
import mockData from "../data/mockData.json";
import { useDispatch } from "react-redux";

export const SignInPage: React.FC = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setstate] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const { email, password } = state;

  const signInInputs = mockData.signInInputs;
  signInInputs.map((input) => (input.value = eval(input.value)));

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const response = await userAuth.logIn(email, password);
    if (response) {
      navigate("/user/profile");
    } else console.log(response.error);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setstate({ ...state, [name]: value });
  };
  const checkboxChangeHandler = () => {
    setstate({ ...state, rememberMe: !state.rememberMe });
  };
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-start">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/")}
            >
              <Icon name="back" size="lg" />
            </Button>
          </div>
        </Header>
        <CardBody classname="flex-align-start">
          <h1>Hello there</h1>
          <p>Please Enter your username/email & password to sign in.</p>
          <Form id="myform" onSubmit={submitHandler}>
            {signInInputs.map((input) => (
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
