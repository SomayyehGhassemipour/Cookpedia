import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { Header } from "../sharedComponents/Header";
import { CardBody } from "../sharedComponents/card/CardBody";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../redux/firebase";

export default function WelcomePage() {
  let navigate = useNavigate();

  const clickHandlerGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        navigate("/profile");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };
  return (
    <div className="container">
      <Card classname="flex-justify-space-around">
        <Header align="center">
          <h1 className="text-neutral-800">
            Welcome to <br />
            <h3 className="text-primary-500">Cookpedia</h3>
          </h1>
        </Header>
        <CardBody align="center">
          <p>The best cooking and food recipies app of the century</p>
        </CardBody>
        <div className="flex-small-gap">
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
        </div>
      </Card>
    </div>
  );
}
