import { useNavigate } from "react-router-dom";
import { Avatar } from "../../sharedComponents/Avatar";
import { Button } from "../../sharedComponents/Button";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Form } from "../../sharedComponents/form/Form";
import { FieldSet } from "../../sharedComponents/form/FieldSet";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { ProgressBar } from "../../sharedComponents/ProgressBar";
import { SelectInput } from "../../sharedComponents/SelectInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserPersonalData } from "../../redux/features/users/currentUserSlice";
import mockData from "../../data/mockData.json";

export const PersonalDataPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    fullname: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
  });
  const { fullname, phoneNumber, birthday, gender } = state;

  const PersonalDataInputs = mockData.PersonalDataInputs;
  PersonalDataInputs.map((input) => (input.value = eval(input.value)));

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setUserPersonalData(state));

    navigate("/signup-create-account");
  };
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const options = ["gender", "male", "female", "other"];
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-around">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/signup-cooking")}
            >
              <Icon name="back" size="lg" />
            </Button>
            <ProgressBar progress={75} />
          </div>
        </Header>
        <CardBody classname="flex-align-start">
          <h1>Compelete Your Profile</h1>
          <label>
            Don't worry, only you can see your personal data. No one else will
            be able to see it.
          </label>
          <div className="flex-row-justify-around">
            <div className="profile-avatar">
              <Avatar
                classname="avatar-profile"
                url="user.png"
                name="AC"
                type="avatar-circle"
              />
              <div className="edit-avatar">
                <Icon name="edit" size="sm" />
              </div>
            </div>
          </div>
          <Form id="myForm" onSubmit={submitHandler}>
            {PersonalDataInputs.map((input) =>
              input.name === "gender" ? (
                <SelectInput
                  key={input.id}
                  label="Gender"
                  name="gender"
                  placeholdertxt="Gender"
                  options={options}
                  onChange={changeHandler}
                />
              ) : (
                <FieldSet key={input.id} {...input} onChange={changeHandler} />
              )
            )}
          </Form>
        </CardBody>
        <CardAction>
          <Button
            form="myForm"
            data_type="container"
            data_bg="primary"
            type="submit"
          >
            <p>Continue</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
