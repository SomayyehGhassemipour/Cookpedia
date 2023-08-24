import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../sevices/firebase/config";
import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { CardAction } from "../sharedComponents/card/CardAction";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";

export const HomePage: React.FC = () => {
  let navigate = useNavigate();

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

  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row"></div>
        </Header>
        <CardBody>
          <h1>
            Hello <p>{auth.currentUser?.displayName}</p>
          </h1>
        </CardBody>
        <CardAction>
          <Button
            data_type="container"
            data_bg="primary"
            clickHandler={signOutHandler}
          >
            <p>Sign out</p>
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};
