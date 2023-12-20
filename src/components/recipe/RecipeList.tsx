import React from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../model/Recipe";
import { Button } from "../../sharedComponents/Button";
import { RecipeCard } from "./RecipeCard";
import { List } from "../../sharedComponents/list/List";

interface Props {
  recipes: Recipe[];
}
export const RecipeList: React.FC<Props> = ({ recipes }) => {
  const navigate = useNavigate();

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
