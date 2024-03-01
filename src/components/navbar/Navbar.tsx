import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { Icon } from "../../sharedComponents/Icon";

export const Navbar = () => {
  let navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="navbar flex-row-justify-around">
      <Button
        data_type="container"
        data_bg="transparent"
        data_active={activeMenu === "Home" ? true : false}
        clickHandler={() => {
          setActiveMenu("Home");
          navigate("/user/home");
        }}
      >
        <Icon name="home" size="lg" />
        <p className="label">Home</p>
      </Button>
      <Button
        data_type="container"
        data_bg="transparent"
        data_active={activeMenu === "Discover" ? true : false}
        clickHandler={() => {
          setActiveMenu("Discover");
          navigate("/user/discover");
        }}
      >
        <Icon name="discover" size="lg" />
        <p className="label">Discover</p>
      </Button>
      <Button
        classname="big-circle-button"
        data_type="container"
        data_bg="circle"
        clickHandler={() => {
          setActiveMenu("CreateRecipe");
          navigate("create-recipe");
        }}
      >
        <Icon name="add" size="lg" />
      </Button>
      <Button
        data_type="container"
        data_bg="transparent"
        data_active={activeMenu === "MyRecipes" ? true : false}
        clickHandler={() => {
          setActiveMenu("MyRecipes");
          navigate("/user/my-recipes");
        }}
      >
        <Icon name="recipe" size="lg" />
        <p className="label">My Recipes</p>
      </Button>
      <Button
        data_type="container"
        data_bg="transparent"
        data_active={activeMenu === "Profile" ? true : false}
        clickHandler={() => {
          setActiveMenu("Profile");
          navigate("/user/profile");
        }}
      >
        <Icon name="profile" size="lg" />
        <p className="label">Profile</p>
      </Button>
    </div>
  );
};
