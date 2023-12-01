import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../model/Recipe";
import { setRecipesData } from "../../redux/features/recipes/recipesSlice";
import { auth } from "../../sevices/firebase/config";
import { getAllRecipesByUserID } from "../../sevices/recipie/RecipieService";
import messages from "../../data/message.json";
import { Button } from "../../sharedComponents/Button";
import { RecipeCard } from "./RecipeCard";
import { List } from "../../sharedComponents/list/List";

export const RecipeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const recipesData = await getAllRecipesByUserID(userId);
          setRecipes(recipesData);
          dispatch(setRecipesData(recipesData));
        } catch (error: any) {
          alert(messages.ERROR_IN_READING_RECIPIES_OF_USER + error);
        }
      } else {
        console.log(messages.NO_LOGGED_IN_USER);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <List>
      <div className="flex-row-wrap">
        {recipes.map((recipe, index) => (
          <Button
            key={index}
            data_type="container"
            data_bg="transparent"
            clickHandler={() =>
              navigate(`/user/recipe-details/${recipe.recipeID}`)
            }
          >
            <RecipeCard recipe={recipe} />
          </Button>
        ))}
      </div>
    </List>
  );
};
