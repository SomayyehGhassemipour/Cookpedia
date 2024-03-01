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
import { Loading } from "../../sharedComponents/Loading";
import {
  followUser,
  getAllFollowing,
  getAllFollowers,
  isFollowedBy,
  unFollowUser,
} from "../../sevices/user/FollowingService";
interface Props {
  userId: string;
}
export const Profile: React.FC<Props> = ({ userId }) => {
  let navigate = useNavigate();
  const userAuth = useUserAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [following, setFollowing] = useState<[]>([]);
  const [followers, setFollowers] = useState<[]>([]);
  const [followUnfollowStatus, setFollowUnfollowStatus] = useState<
    "Unfollow" | "Follow"
  >("Unfollow");

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
    const isFollowing = async (userId: any) => {
      const status = await isFollowedBy(userId, userAuth.user.uid);
      if (status) setFollowUnfollowStatus("Unfollow");
      else setFollowUnfollowStatus("Follow");
    };

    const fetchFollowing = async (userId: any) => {
      try {
        const followingData = await getAllFollowing(userId);
        setFollowing(followingData);
      } catch (error) {
        console.log(messages.ERROR_IN_READING_FOLLOWING_OF_USER);
      }
    };
    const fetchFollowers = async (userId: any) => {
      try {
        const followersData = await getAllFollowers(userId);
        setFollowers(followersData);
      } catch (error) {
        console.log(messages.ERROR_IN_READING_FOLLOWERS_OF_USER);
      }
    };
    fetchUser(userId);
    if (userAuth.user.uid !== userData?.userID) isFollowing(userId);
    fetchFollowing(userId);
    fetchFollowers(userId);
  }, [userId, followUnfollowStatus]);

  const refRecipeBtn: any = useRef(null);
  const refAboutBtn: any = useRef(null);

  const [activeTab, setActiveTab] = useState("Recipes");

  const activeTabHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.innerText === "Recipes"
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
      if (followUnfollowStatus == "Follow") {
        await followUser(followerUserId, followingUserId);
        setFollowUnfollowStatus("Unfollow");
      } else {
        await unFollowUser(followerUserId, followingUserId);
        setFollowUnfollowStatus("Follow");
      }
    } catch (error: any) {
      alert(messages.ERROR_IN_FOLLOW_USER + error);
    }
  };

  if (!userData) return <Loading />;
  return (
    <>
      <UserCard
        avatar={userData?.avatar}
        fullname={userData?.fullname}
        userName={userData?.userName}
        type={
          userAuth.user.uid === userData?.userID ? "Edit" : followUnfollowStatus
        }
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
          <h3>{recipes.length}</h3>
          <p className="text-neutral-600">Recipes</p>
        </div>
        <LineSeperator type="vertical" />
        <div className="flex-column-center">
          <h3>{following.length}</h3>
          <p className="text-neutral-600">following</p>
        </div>
        <LineSeperator type="vertical" />
        <div className="flex-column-center">
          <h3>{followers.length}</h3>
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
