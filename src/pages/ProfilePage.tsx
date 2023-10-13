import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../sevices/firebase/config";
import { Avatar } from "../sharedComponents/Avatar";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import { useUserAuth } from "../sevices/firebase/AthenicationService";
import messages from "../data/message.json";
import { User } from "../data/objects";
import { useDispatch } from "react-redux";
import { getUserData } from "../sevices/user/UserService";
import {
  setUserDataEmpty,
  setAllUserData,
} from "../redux/features/users/currentUserSlice";

export const ProfilePage = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();
  const db = getFirestore();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const userData = await getUserData(userId);
          setUserData(userData as User);
          dispatch(setAllUserData(userData));
        } catch (error) {
          console.log(messages.FETCH_USER_INFO_ERORR);
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, [db]);

  const signOutHandler = async () => {
    try {
      await userAuth.logOut();
      dispatch(setUserDataEmpty());
      navigate("/");
    } catch (error: any) {
      alert(error.Message);
    }
  };
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <h2>Profile</h2>
          <div className="ml-auto flex-row">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={signOutHandler}
            >
              <Icon name="share" size="lg" />
            </Button>
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/")}
            >
              <Icon name="settings" size="lg" />
            </Button>
          </div>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <div className="container flex-row-justify-start">
          <div className="profile-avatar">
            <Avatar
              classname="avatar-profile"
              url={userData?.avatar ? userData.avatar : "../user.png"}
              name="AC"
              type={"circle"}
              size={"lg"}
            />
          </div>
          <div className="flex-align-start">
            <h3>{userData?.fullname}</h3>
            <p className="text-neutral-600">{userData?.userName}</p>
          </div>
          <div className="ml-auto">
            <Button data_bg="google" data_type="container">
              <div className="flex-row-justify-around">
                <Icon name="edit" size="xs" />
                <p>Edit</p>
              </div>
            </Button>
          </div>
        </div>
        <LineSeperator type="horizontal" />
        <div className="flex-row-justify-around">
          <div className="flex-column-center">
            <h3>125</h3>
            <p className="text-neutral-600">recipies</p>
          </div>
          <LineSeperator type="vertical" />
          <div className="flex-column-center">
            <h3>104</h3>
            <p className="text-neutral-600">following</p>
          </div>
          <LineSeperator type="vertical" />
          <div className="flex-column-center">
            <h3>2k</h3>
            <p className="text-neutral-600">followers</p>
          </div>
        </div>
        <LineSeperator type="horizontal" />
        <div className="flex-row-justify-around">
          <Button data_type="container" data_bg="transparent">
            <h4>Recipes</h4>
          </Button>
          <Button data_type="container" data_bg="transparent">
            <h4>About</h4>
          </Button>
        </div>

        <LineSeperator type="horizontal" />
        <h4>Description</h4>
        <p>{userData?.aboutme}</p>
        <LineSeperator type="horizontal" />
        <div className="container flex-row-justify-around">
          <Button data_type="container" data_bg="transparent">
            <Icon name="facebook" />
          </Button>
          <Button data_type="container" data_bg="transparent">
            <Icon name="instagram" />
          </Button>
          <Button data_type="container" data_bg="transparent">
            <Icon name="twitter" />
          </Button>
          <Button data_type="container" data_bg="transparent">
            <Icon name="whatsapp" />
          </Button>
        </div>
        <LineSeperator type="horizontal" />
        <h4>More Info</h4>
        <div className="container flex-row-justify-start">
          <Icon name="location" size="lg" />
          <p>
            {userData?.country}, {userData?.city}
          </p>
        </div>
        <div className="container flex-row-justify-start">
          <Icon name="info" size="lg" />
          <p>Joined since {userData?.joinedDate}</p>
        </div>
      </CardBody>
    </>
  );
};
