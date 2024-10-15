import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateRecipePage } from "../../pages/recipe/CreateRecipePage";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { MyRecipesPage } from "../../pages/recipe/MyRecipesPage";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { Navbar } from "../navbar/Navbar";
import { RecipeDetailsPage } from "../../pages/recipe/RecipeDetailsPage";
import { EditRecipePage } from "../../pages/recipe/EditRecipePage";
import { EditProfilePage } from "../../pages/EditProfilePage";
import { DiscoverPage } from "../../pages/DiscoverPage";
import { UserProfile } from "../../pages/UserProfile";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import { FollowingsFollowersPage } from "../../pages/FollowingsFollowersPage";
import { MyBookmarksPage } from "../../pages/MyBookmarksPage";

export const User = () => {
  const userAuth = useUserAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!userAuth.user.uid) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Routes>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
          <Route path="/recipe-details/:id" element={<RecipeDetailsPage />} />
          <Route path="/recipe-edit/:id" element={<EditRecipePage />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/bookmarks" element={<MyBookmarksPage />} />
          <Route path="/following" element={<FollowingsFollowersPage />} />
          <Route path="/followers" element={<FollowingsFollowersPage />} />
        </Routes>
        <CardAction>
          <Navbar />
        </CardAction>
      </Card>
    </div>
  );
};
