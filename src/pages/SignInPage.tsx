import { useRef, useState } from "react";
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

export const SignInPage: React.FC = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();

  const signInRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (signInRef.current)
        signInRef.current.focus()
    }
  };


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
    if (response.error) {
      alert(response.error);
    } else navigate("/user/home");
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
          <p>Please Enter your email & password to sign in.</p>
          <Form id="myform" onSubmit={submitHandler}>
            {signInInputs.map((input) => (
              <FieldSet key={input.id} {...input} onChange={changeHandler} handleKeyDown={handleKeyDown} />
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
              clickHandler={() => navigate("/")}
            >
              <h5 className="text-primary-500">Forget Password</h5>
            </Button>
            <LineSeperator type="horizontal" content="or continue with" />
            <section className="flex-column-center">
              <div className="flex-row-justify-around">
                <Button
                  data_type="container"
                  data_bg="transparent"
                  type="button"
                >
                  <Icon name="google" />
                </Button>
                <Button
                  data_type="container"
                  data_bg="transparent"
                  type="button"
                >
                  <Icon name="facebook" />
                </Button>
                <Button
                  data_type="container"
                  data_bg="transparent"
                  type="button"
                >
                  <Icon name="apple" />
                </Button>
              </div>
            </section>
          </Form>
        </CardBody>
        <CardAction>
          <Button form="myform" data_type="container" data_bg="primary" reference={signInRef}>
            <p>Sign In</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
