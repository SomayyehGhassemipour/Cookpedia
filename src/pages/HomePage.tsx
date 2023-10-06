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
    <>
      <Header>
        <div className="flex-row"></div>
      </Header>
      <CardBody classname="flex-align-start">
        <h1>
          Hello <p>{auth.currentUser?.displayName}</p>
        </h1>
      </CardBody>
    </>
  );
};
