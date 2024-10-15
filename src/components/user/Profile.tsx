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
import MESSAGES from "../../data/message.json";
import { Loading } from "../../sharedComponents/Loading";
import {
  followUser,
  getAllFollowing,
  getAllFollowers,
  isFollowedBy,
  unFollowUser,
} from "../../sevices/user/FollowingService";
import {
  setUserFollowers,
  setUserFollowings,
} from "../../redux/features/users/currentUserSlice";
import { useDispatch } from "react-redux";
interface Props {
  userId: string;
}
export const Profile: React.FC<Props> = ({ userId }) => {
  let navigate = useNavigate();
  const userAuth = useUserAuth();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalFollowings, setTotalFollowings] = useState<number>(0);
  const [totalFollowers, setTotalFollowers] = useState<number>(0);
  const [followStatus, setFollowStatus] = useState<"Unfollow" | "Follow">(
    "Unfollow"
  );

  const recipeButtonRef: any = useRef(null);
  const aboutButtonRef: any = useRef(null);

  const fetchRecipesData = async (id: string) => {
    try {
      const recipesData = await getAllRecipesByUserID(id);
      setRecipes(recipesData as Recipe[]);
    } catch (error) {
      console.log(MESSAGES.ERROR_IN_READING_RECIPIES_OF_USER);
    }
  };
  const fetchUserData = async (id: any) => {
    try {
      const userData = await getUserDataByID(id as string);
      setUserData(userData as User);

      await fetchRecipesData(id);
    } catch (error) {
      console.log(MESSAGES.FETCH_USER_INFO_ERORR);
    }
  };
  const isFollowing = async (userId: any) => {
    const status = await isFollowedBy(userId, userAuth.user.uid);
    if (status) setFollowStatus("Unfollow");
    else setFollowStatus("Follow");
  };

  const fetchFollowing = async (userId: any) => {
    try {
      const followingData = await getAllFollowing(userId);
      dispatch(setUserFollowings({ followings: followingData }));
      setTotalFollowings(followingData.length);
    } catch (error) {
      console.log(MESSAGES.ERROR_IN_READING_FOLLOWING_OF_USER);
    }
  };
  const fetchFollowers = async (userId: any) => {
    try {
      const followersData = await getAllFollowers(userId);

      dispatch(setUserFollowers({ followers: followersData }));
      setTotalFollowers(followersData.length);
    } catch (error) {
      console.log(MESSAGES.ERROR_IN_READING_FOLLOWERS_OF_USER);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
    if (userAuth.user.uid !== userData?.userID) isFollowing(userId);
    console.log("first");
    fetchFollowing(userId);
    fetchFollowers(userId);
  }, [userId, followStatus]);

  const [activeTab, setActiveTab] = useState("Recipes");

  const activeTabHandler = (activeTab: string) => (event: React.MouseEvent<HTMLElement>) => {
    activeTab === "Recipes"
      ? setActiveTab("Recipes")
      : setActiveTab("About");
  };

  const followUfollowClickHandler = async (
    event: React.MouseEvent<HTMLElement>,
    followerUserId: string,
    followingUserId: string
  ) => {
    event.preventDefault();
    try {
      if (followStatus === "Follow") {
        await followUser(followerUserId, followingUserId);
        setFollowStatus("Unfollow");
      } else {
        await unFollowUser(followerUserId, followingUserId);
        setFollowStatus("Follow");
      }
    } catch (error: any) {
      alert(MESSAGES.ERROR_IN_FOLLOW_USER + error);
    }
  };

  if (!userData) return <Loading />;
  return (
    <>
      <UserCard
        avatar={userData?.avatar}
        fullname={userData?.fullname}
        userName={userData?.userName}
        type={userAuth.user.uid === userData?.userID ? "Edit" : followStatus}
        avatarSize="lg"
        clickHandler={(event: React.MouseEvent<HTMLElement>) =>
          userAuth.user.uid === userData?.userID
            ? navigate("/user/edit-profile")
            : followUfollowClickHandler(
              event,
              userAuth.user.uid,
              userData?.userID
            )
        }
      />
      <LineSeperator type="horizontal" />
      <div className="flex-row-justify-around">
        <div className="flex-column-center">
          <Button data_type="container" data_bg="transparent"
            clickHandler={activeTabHandler("Recipes")}>
            <h3>{recipes.length}</h3>
            <p className="text-neutral-600">Recipes</p>
          </Button>
        </div>
        <LineSeperator type="vertical" />
        <div className="flex-column-center">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate("/user/following/")}
          >
            <h3>{totalFollowings}</h3>
            <p className="text-neutral-600">following</p>
          </Button>
        </div>
        <LineSeperator type="vertical" />
        <div className="flex-column-center">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate("/user/followers")}
          >
            <h3>{totalFollowers}</h3>
            <p className="text-neutral-600">followers</p>
          </Button>
        </div>
      </div>
      <LineSeperator type="horizontal" />
      <div className="flex-row-justify-around">
        <Button
          data_type="container"
          data_bg="transparent"
          data_active={activeTab === "Recipes" ? true : false}
          clickHandler={activeTabHandler("Recipes")}
          reference={recipeButtonRef}
        >
          <h4>Recipes</h4>
        </Button>
        <Button
          data_type="container"
          data_bg="transparent"
          data_active={activeTab === "About" ? true : false}
          clickHandler={activeTabHandler("About")}
          reference={aboutButtonRef}
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
