import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../model/Recipe";
import { User } from "../../model/User";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import { getAllRecipesByUserID } from "../../sevices/recipie/RecipieService";
import { getUserDataByID } from "../../sevices/user/UserService";
import { Button } from "../../sharedComponents/Button";
import { LineSeperator } from "../../sharedComponents/LineSeperator";
import { Aboutme } from "../Aboutme";
import { RecipeList } from "../recipe/RecipeList";
import { UserCard } from "./UserCard";
import messages from "../../data/message.json";
interface Props {
  userId: string;
}
export const Profile: React.FC<Props> = ({ userId }) => {
  let navigate = useNavigate();
  const userAuth = useUserAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchUser = async (id: any) => {
      try {
        const userData = await getUserDataByID(id as string);
        setUserData(userData as User);
        try {
          const recipesData = await getAllRecipesByUserID(id as string);
          setRecipes(recipesData as Recipe[]);
        } catch (error) {
          console.log(messages.ERROR_IN_READING_RECIPIES_OF_USER);
        }
      } catch (error) {
        console.log(messages.FETCH_USER_INFO_ERORR);
      }
    };
    fetchUser(userId);
  }, [userId]);

  const refRecipeBtn: any = useRef(null);
  const refAboutBtn: any = useRef(null);

  const [activeTab, setActiveTab] = useState("Recipes");

  const activeTabHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.innerText === "Recipes"
      ? setActiveTab("Recipes")
      : setActiveTab("About");
  };
  if (!userData) return <div>Loading...</div>;
  return (
    <>
      <UserCard
        avatar={userData?.avatar}
        fullname={userData?.fullname}
        userName={userData?.userName}
        type={userAuth.user.uid === userData?.userID ? "Edit" : "Follow"}
        avatarSize="lg"
        clickHandler={() => navigate("/user/edit-profile")}
      />
      <LineSeperator type="horizontal" />
      <div className="flex-row-justify-around">
        <div className="flex-column-center">
          <h3>125</h3>
          <p className="text-neutral-600">Recipes</p>
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
        <Button
          data_type="container"
          data_bg="transparent"
          data_active={activeTab === "Recipes" ? true : false}
          clickHandler={activeTabHandler}
          reference={refRecipeBtn}
        >
          <h4>Recipes</h4>
        </Button>
        <Button
          data_type="container"
          data_bg="transparent"
          data_active={activeTab === "About" ? true : false}
          clickHandler={activeTabHandler}
          reference={refAboutBtn}
        >
          <h4>About</h4>
        </Button>
      </div>

      <LineSeperator type="horizontal" />
      {activeTab === "About" ? (
        <Aboutme userData={userData} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </>
  );
};
