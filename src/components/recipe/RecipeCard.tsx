import React, { useEffect, useState } from "react";

import { Recipe } from "../../model/Recipe";
import { Avatar } from "../../sharedComponents/Avatar";
import messages from "../../data/message.json";
import { getUserDataByID } from "../../sevices/user/UserService";
import { initialUser, User } from "../../model/User";
import { useLocation } from "react-router-dom";

interface Props {
  recipe: Recipe;
}
export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const location = useLocation();
  const activeUserInfo: boolean =
    location.pathname === "/user/profile" ||
    location.pathname === "/user/my-recipes" ||
    location.pathname.includes("user-profile")
      ? false
      : true;

  const title =
    recipe.title.length > 19 ? recipe.title.slice(0, 16) + "..." : recipe.title;
  const [userData, setUserData] = useState<User>(initialUser);
  useEffect(() => {
    const getUser = async (id: any) => {
      try {
        const user = await getUserDataByID(id);
        setUserData(user as User);
      } catch (error) {
        console.log(messages.FETCH_USER_INFO_ERORR, error);
      }
    };
    activeUserInfo && getUser(recipe.userID);
  }, [recipe.userID]);

  return (
    <div
      className="image-card has-bg-img"
      style={{
        backgroundImage: `url(${recipe.image})`,
      }}
    >
      <p className="card__title">
        {title}

        {activeUserInfo && (
          <div className="flex-row-justify-start">
            <Avatar
              classname="avatar-profile"
              image={userData.avatar ? userData.avatar : "../user.png"}
              name="AC"
              type={"circle"}
              size="xs"
            />
            {userData.fullname}
          </div>
        )}
      </p>
    </div>
  );
};
