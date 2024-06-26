import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { FieldSet } from "../../sharedComponents/form/FieldSet";
import { Form } from "../../sharedComponents/form/Form";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { ProgressBar } from "../../sharedComponents/ProgressBar";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/features/users/currentUserSlice";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import { addUser } from "../../sevices/user/UserService";
import mockData from "../../data/mockData.json";
import MESSAGES from "../../data/message.json";

export const CreateAccountPage: React.FC = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { displayName, email, password, passwordConfirm } = state;
  const CreateAcountInputs = mockData.CreateAcountInputs;
  CreateAcountInputs.map((input) => (input.value = eval(input.value)));

  const userData = useSelector(getUserData);
  let navigate = useNavigate();
  const userAuth = useUserAuth();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert(MESSAGES.NOT_MATCH_PASSWORDS);
    } else {
      try {
        const credentioalUser = await userAuth.signUp(email, password);

        const completeUserData = {
          ...userData,
          email: email,
          userName: displayName,
          joinedDate: new Date(Date.now()).toISOString().substring(0, 10),
        };

        try {
          await addUser(credentioalUser.uid, completeUserData);
          console.log(MESSAGES.SUCCESSFUL_UPDATE);
          navigate("/signin");
        } catch (error: any) {
          alert(MESSAGES.ERROR_IN_ADDING_USER + error);
        }
      } catch (error: any) {
        alert(MESSAGES.ERROR_IN_SIGN_UP + error);
      }

      setState({
        displayName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-around">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate(-1)}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={100} />
          </div>
        </Header>
        <CardBody classname="flex-align-start">
          <h1>Create an Account</h1>
          <p>
            Enter your username, email & password. If you forget it, then you
            have to do forgot password.
          </p>
          <Form id="myform" onSubmit={submitHandler}>
            {CreateAcountInputs.map((input) => (
              <FieldSet key={input.id} {...input} onChange={changeHandler} />
            ))}
          </Form>
        </CardBody>
        <CardAction>
          <Button
            form="myform"
            type="submit"
            data_type="container"
            data_bg="primary"
          >
            <p>Sign Up</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
