import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Icon } from "../Icon";

export const Navbar = () => {
  let navigate = useNavigate();
  return (
    <div className="navbar flex-row-justify-around">
      <Button
        data_type="container"
        data_bg="transparent"
        clickHandler={() => {
          navigate("/user/home");
        }}
      >
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
          navigate("create-recipe");
        }}
      >
        <Icon name="add" size="lg" />
      </Button>
      <Button
        data_type="container"
        data_bg="transparent"
        clickHandler={() => {
          navigate("/user/my-recipes");
        }}
      >
        <Icon name="recipe" size="lg" />
        <p className="label">My Recipes</p>
      </Button>
      <Button
        data_type="container"
        data_bg="transparent"
        clickHandler={() => {
          navigate("/user/profile");
        }}
      >
        <Icon name="profile" size="lg" />
        <p className="label">Profile</p>
      </Button>
    </div>
  );
};
