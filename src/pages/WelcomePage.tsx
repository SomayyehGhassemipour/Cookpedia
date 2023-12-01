import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { Header } from "../sharedComponents/Header";
import { CardBody } from "../sharedComponents/card/CardBody";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../sevices/firebase/AthenicationService";

export default function WelcomePage() {
  let navigate = useNavigate();
  const userAuth = useUserAuth();

  const clickHandlerGoogle = async () => {
    const response = await userAuth.logInWithGoogle();
    if (response) navigate("/user/home");
    else console.log(response.error);
  };
  return (
    <div className="container">
      <Card classname="flex-justify-space-around">
        <Header align="center">
          <h1 className="text-neutral-800">
            Welcome to <br />
            <div className="text-primary-500">Cookpedia</div>
          </h1>
        </Header>
        <CardBody classname="flex-align-center">
          <p>The best cooking and food recipies app of the century</p>
        </CardBody>
        <section className="flex-small-gap">
          <Button
            data_bg="google"
            data_type="container"
            clickHandler={clickHandlerGoogle}
          >
            <p>Continue With Google</p>
          </Button>
          <br />
          <Button
            data_bg="primary"
            data_type="container"
            clickHandler={() => navigate("/signup-country")}
          >
            <p>Get Started</p>
          </Button>
          <br />
          <Button
            data_bg="secondary"
            data_type="container"
            clickHandler={() => navigate("/signin")}
          >
            <p>I Already Have an Account</p>
          </Button>
        </section>
      </Card>
    </div>
  );
}
