import { onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../sevices/firebase/config";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import { useUserAuth } from "../sevices/firebase/AthenicationService";
import messages from "../data/message.json";
import { User } from "../model/User";
import { useDispatch } from "react-redux";
import { getUserDataByID } from "../sevices/user/UserService";
import {
  setUserDataEmpty,
  setAllUserData,
} from "../redux/features/users/currentUserSlice";
import { Aboutme } from "../components/Aboutme";
import { RecipeList } from "../components/recipe/RecipeList";
import { UserCard } from "../components/user/UserCard";
import { Recipe } from "../model/Recipe";
import { getAllRecipesByUserID } from "../sevices/recipie/RecipieService";
import { setRecipesData } from "../redux/features/recipes/recipesSlice";

export const ProfilePage = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();
  const db = getFirestore();
  const dispatch = useDispatch();
  const refRecipeBtn: any = useRef(null);
  const refAboutBtn: any = useRef(null);

  const [activeTab, setActiveTab] = useState("Recipes");
  const [userData, setUserData] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const userData = await getUserDataByID(userId);
          setUserData(userData as User);
          dispatch(setAllUserData(userData));

          const recipesData = await getAllRecipesByUserID(userId);
          setRecipes(recipesData);
          dispatch(setRecipesData(recipesData));
        } catch (error) {
          console.log(messages.FETCH_USER_INFO_ERORR);
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, [db, dispatch]);

  const signOutHandler = async () => {
    if (window.confirm("Are you sure you want to sign out?") === true) {
      try {
        await userAuth.logOut();
        dispatch(setUserDataEmpty());
        navigate("/");
      } catch (error: any) {
        alert(error.Message);
      }
    }
  };
  const activeTabHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.innerText === "Recipes"
      ? setActiveTab("Recipes")
      : setActiveTab("About");
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
        <UserCard
          avatar={userData?.avatar}
          fullname={userData?.fullname}
          userName={userData?.userName}
          type="Edit"
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
      </CardBody>
    </>
  );
};
