import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateRecipe } from "../../pages/recipe/CreateRecipe";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { MyRecipesPage } from "../../pages/recipe/MyRecipesPage";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { Navbar } from "../navbar/Navbar";
import { RecipeDetails } from "../../pages/recipe/RecipeDetails";

export const User = () => {
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Routes>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        </Routes>
        <CardAction>
          <Navbar />
        </CardAction>
      </Card>
    </div>
  );
};