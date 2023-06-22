import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { CheckBox } from "../../sharedComponents/CheckBox";
import { FieldSet } from "../../sharedComponents/form/FieldSet";
import { Form } from "../../sharedComponents/form/Form";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { ProgressBar } from "../../sharedComponents/ProgressBar";
import { auth, db } from "../../redux/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  setUserEmail,
  setUserName,
} from "../../redux/features/users/currentUserSlice";

export const CreateAccountPage: React.FC = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { displayName, email, password, passwordConfirm } = state;

  const inputs = [
    {
      id: "1",
      label: "Username",
      placeholdertxt: "Username",
      inputType: "text",
      name: "displayName",
      value: displayName,
      errorMessage: "Username should be 3-16 characters.",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: "2",
      label: "Email",
      placeholdertxt: "Email",
      inputType: "email",
      name: "email",
      value: email,
      errorMessage: "It should be a valid email address.",
      required: true,
    },
    {
      id: "3",
      label: "Password",
      placeholdertxt: "Password",
      inputType: "password",
      name: "password",
      value: password,
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character.",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
    },
    {
      id: "4",
      label: "Confirm Password",
      placeholdertxt: "Password",
      inputType: "password",
      name: "passwordConfirm",
      value: passwordConfirm,
      errorMessage: "Passwords don't match.",
      pattern: state.password,
      required: true,
    },
  ];

  const userData = useSelector(getUserData);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("sunbmited!");
    e.preventDefault();

    if (password !== passwordConfirm) {
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const completeUserData = {
          ...userData,
          email: email,
          userName: displayName,
        };

        setDoc(doc(db, "users", user.uid), completeUserData)
          .then(() => {
            console.log("update successful");
          })
          .catch((error) => {
            console.log("error:", error);
          });
        navigate("/signin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });

    setState({ displayName: "", email: "", password: "", passwordConfirm: "" });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
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
              clickHandler={() => navigate("/signup-personal-data")}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={100} />
          </div>
        </Header>
        <CardBody>
          <h1>Create an Account</h1>
          <p>
            Enter your username, email & password. If you forget it, then you
            have to do forgot password.
          </p>
          <Form id="myform" onSubmit={submitHandler}>
            {inputs.map((input) => (
              <FieldSet key={input.id} {...input} onChange={changeHandler} />
            ))}
          </Form>
        </CardBody>
        <CardAction>
          <Button
            form="myform"
            data_type="container"
            data_bg="primary"
            type="submit"
          >
            <p>Sign Up</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};