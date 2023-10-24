import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateRecipePage } from "../../pages/recipe/CreateRecipePage";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { MyRecipesPage } from "../../pages/recipe/MyRecipesPage";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { Navbar } from "../navbar/Navbar";
import { RecipeDetailsPage } from "../../pages/recipe/RecipeDetailsPage";
import { EditRecipePage } from "../../pages/recipe/EditRecipePage";

export const User = () => {
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Routes>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
          <Route path="/recipe-details/:id" element={<RecipeDetailsPage />} />
          <Route path="/recipe-edit/:id" element={<EditRecipePage />} />
        </Routes>
        <CardAction>
          <Navbar />
        </CardAction>
      </Card>
    </div>
  );
};
