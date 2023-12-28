import { Profile } from "../components/user/Profile";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../sharedComponents/Header";
import { Button } from "../sharedComponents/Button";
import { Icon } from "../sharedComponents/Icon";
import { CardBody } from "../sharedComponents/card/CardBody";

export const UserProfile = () => {
  let { id } = useParams();
  let navigate = useNavigate();
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
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <Profile userId={id as string} />
      </CardBody>
    </>
  );
};
