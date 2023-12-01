import { auth } from "../sevices/firebase/config";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";

export const HomePage: React.FC = () => {
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
