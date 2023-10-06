import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateRecipe } from "../../pages/CreateRecipe";
import { HomePage } from "../../pages/HomePage";
import { ProfilePage } from "../../pages/ProfilePage";
import { RecipesPage } from "../../pages/RecipesPage";
import { Card } from "../../sharedComponents/card/Card";
import { CardAction } from "../../sharedComponents/card/CardAction";
import { Navbar } from "../../sharedComponents/navbar/Navbar";

export const User = () => {
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Routes>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-recipes" element={<RecipesPage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
        <CardAction>
          <Navbar />
        </CardAction>
      </Card>
    </div>
  );
};
