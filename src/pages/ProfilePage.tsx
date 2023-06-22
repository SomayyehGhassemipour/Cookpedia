import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../redux/firebase";
import { Avatar } from "../sharedComponents/Avatar";
import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { CardAction } from "../sharedComponents/card/CardAction";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import { Navbar } from "../sharedComponents/navbar/Navbar";
interface UserData {
  userName: string;
  email: string;
  fullname: string;
  birthday: string;
  cookLevel: string;
  country: string;
  phoneNumber: string;
  image: string;
  gender: string;
  facebook: string;
}
export const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  let navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;

        const userRef = doc(db, "users", userId);
        const userDoc: DocumentSnapshot = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          console.log("no such document!");
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const signOutHandler = async () => {
    if (auth.currentUser)
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
  };
  console.log(auth.currentUser?.displayName);
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-start">
            <h2>Profile</h2>
            <div className="ml-auto" style={{ display: "flex" }}>
              <Button
                data_type="container"
                data_bg="transparent"
                clickHandler={() => navigate("/")}
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
        <CardBody>
          <div className="container flex-row-justify-start">
            <div className="profile-avatar">
              <Avatar
                classname="avatar-profile"
                url="user.png"
                name="AC"
                type="avatar-circle"
              />
            </div>
            <div className="flex-align-start">
              <h2>{userData?.fullname}</h2>
              <p className="text-neutral-600">{userData?.userName}</p>
            </div>
            <div className="ml-auto">
              <Button data_bg="primary" data_type="container">
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
        </CardBody>
        <CardAction>
          <Navbar>
            <Button data_type="container" data_bg="transparent">
              <Icon name="home" size="lg" />
              <p className="label">Home</p>
            </Button>
            <Button data_type="container" data_bg="transparent">
              <Icon name="discover" size="lg" />
              <p className="label">Discover</p>
            </Button>
            <Button
              data_type="container"
              data_bg="circle"
              clickHandler={() => {
                navigate("/create-recipe");
              }}
            >
              <Icon name="add" size="lg" />
            </Button>
            <Button data_type="container" data_bg="transparent">
              <Icon name="recipe" size="lg" />
              <p className="label">My Recipes</p>
            </Button>
            <Button data_type="container" data_bg="transparent">
              <Icon name="profile" size="lg" />
              <p className="label">Profile</p>
            </Button>
          </Navbar>
        </CardAction>
      </Card>
    </div>
  );
};
