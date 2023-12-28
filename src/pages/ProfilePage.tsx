import { useNavigate } from "react-router-dom";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { useUserAuth } from "../sevices/firebase/AthenicationService";
import { Profile } from "../components/user/Profile";

export const ProfilePage = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();

  let userId: string = userAuth.user.uid;

  const signOutHandler = async () => {
    if (window.confirm("Are you sure you want to sign out?") === true) {
      try {
        await userAuth.logOut();
        navigate("/");
      } catch (error: any) {
        alert(error.Message);
      }
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
            <Button data_type="container" data_bg="transparent">
              <Icon name="settings" size="lg" />
            </Button>
          </div>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <Profile userId={userId} />
      </CardBody>
    </>
  );
};
