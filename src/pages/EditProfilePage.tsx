import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../sharedComponents/Avatar";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { SelectInput } from "../sharedComponents/SelectInput";
import { FieldSet } from "../sharedComponents/form/FieldSet";
import { Form } from "../sharedComponents/form/Form";
import { auth } from "../sevices/firebase/config";
import { getUserDataByID, updateUserData } from "../sevices/user/UserService";
import messages from "../data/message.json";
import { User, initialUser } from "../model/User";

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<User>();
  const [prevUserAvatar, setprevUserAvatar] = useState<any>();

  const userId = auth.currentUser?.uid;

  const genderOptions = ["gender", "male", "female", "other"];
  const cookLevelOptions = [
    "Novice",
    "Intermediate",
    "Advanced",
    "Professional",
  ];

  useEffect(() => {
    const fetchUser = async (id: any) => {
      try {
        const Data = await getUserDataByID(id as string);
        setState(Data as User);
      } catch (error) {
        console.log(messages.FETCH_USER_INFO_ERORR);
      }
    };
    fetchUser(userId);
    setprevUserAvatar(state?.avatar);
  }, [userId, state?.avatar]);

  const getImage = (event: any) => {
    const image = event.target.files[0];
    if (image) {
      setState({ ...(state as User), avatar: image });
      event.target.files = null;
    }
  };
  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = event.target;
    setState({ ...(state as User), [name]: value });
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateUserData(state?.userID, state as User, prevUserAvatar);
    } catch (error: any) {
      alert(messages.ERROR_IN_UPDATING_USER + error);
    }
    setState(initialUser);
    navigate("/user/profile");
  };
  if (!state) return <div>Loading...</div>;
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate(-1)}
          >
            <Icon name="back" size="lg" />
          </Button>
          <h2>Edit Profile</h2>
          <div className="ml-auto flex-row">
            <Button
              data_bg="primary"
              data_type="container"
              form="myForm"
              type="submit"
            >
              <p>Save</p>
            </Button>
          </div>
        </div>
      </Header>

      <CardBody classname="flex-align-start">
        <div className="flex-row-justify-around">
          <Avatar
            classname="avatar-profile"
            image={state?.avatar}
            name="avatar-photo"
            type={"circle"}
            size={"lg"}
            editable={true}
            changeHandler={getImage}
          />
        </div>
        <Form id="myForm" onSubmit={submitHandler}>
          <FieldSet
            label="Username"
            placeholdertxt="Username"
            inputType="text"
            name="userName"
            value={state?.userName}
            errorMessage="Username should be 3-16 characters."
            pattern="^[A-Za-z0-9\-_]{3,16}$"
            onChange={changeHandler}
          />
          <FieldSet
            label="About Me"
            placeholdertxt="Say something about yourself"
            inputType="text"
            data_type="textarea"
            name="aboutme"
            value={state?.aboutme}
            errorMessage="aboutme field should be up to 100 characters."
            pattern="^[A-Za-z ]{16}$"
            onChange={changeHandler}
          />
          <FieldSet
            label="Full Name"
            placeholdertxt="Full Name"
            inputType="text"
            name="fullname"
            value={state?.fullname}
            errorMessage="Username should be 3-16 characters."
            pattern="^[A-Za-z ]{3,16}$"
            onChange={changeHandler}
          />
          <FieldSet
            label="Email"
            placeholdertxt="Email"
            inputType="email"
            name="email"
            value={state?.email}
            errorMessage="It should be a valid email address."
            onChange={changeHandler}
          />

          <FieldSet
            label="Phone Number"
            placeholdertxt="+1 000 000 000"
            inputType="phone"
            name={"phoneNumber"}
            value={state?.phoneNumber}
            errorMessage="It should be a valid number."
            pattern="^[0-9+]{12}$"
            onChange={changeHandler}
          />

          <SelectInput
            label="Gender"
            name="gender"
            placeholdertxt="Gender"
            defaultValue={state?.gender}
            options={genderOptions}
            onChange={changeHandler}
          />
          <FieldSet
            label="Date of Birth"
            placeholdertxt="MM/DD?YYYY"
            inputType="date"
            name="birthday"
            value={String(state?.birthday)}
            errorMessage="Please put your birthday"
            onChange={changeHandler}
          />
          <FieldSet
            label="Country"
            placeholdertxt="Poland"
            inputType="text"
            name="country"
            value={state?.country}
            errorMessage="Please put your country"
            onChange={changeHandler}
          />
          <FieldSet
            label="City"
            placeholdertxt="Wroclaw"
            inputType="text"
            name="city"
            value={state?.city}
            errorMessage="Please put your city"
            onChange={changeHandler}
          />
          <SelectInput
            label="Cook Level"
            name="cooklevel"
            placeholdertxt="Cook Level"
            options={cookLevelOptions}
            defaultValue={state?.cookLevel}
            onChange={changeHandler}
          />
          <FieldSet
            label="Facebook"
            placeholdertxt="www.facebook.com/name"
            inputType="text"
            name="facebook"
            value={state?.facebook}
            errorMessage="Please put your Facebook account link"
            onChange={changeHandler}
          />
          <FieldSet
            label="Twitter"
            placeholdertxt="www.twitter.com/name"
            inputType="text"
            name="twitter"
            value={state?.twitter}
            errorMessage="Please put your Twitter account link"
            onChange={changeHandler}
          />
          <FieldSet
            label="Instagram"
            placeholdertxt="www.instagram.com/name"
            inputType="text"
            name="instagram"
            value={state?.instagram}
            errorMessage="Please put your Instagram account link"
            onChange={changeHandler}
          />
        </Form>
      </CardBody>
    </>
  );
};
