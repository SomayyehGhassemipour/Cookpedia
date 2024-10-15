import React from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../model/Recipe";
import { Button } from "../../sharedComponents/Button";
import { Loading } from "../../sharedComponents/Loading";
import { RecipeCard } from "./RecipeCard";

interface Props {
  recipes: Recipe[];
}
export const RecipeList: React.FC<Props> = ({ recipes }) => {
  const navigate = useNavigate();

  if (!recipes) return <Loading />;
  return (
    <>
      <div className="flex-row-wrap">
        {recipes.length === 0 ? <p className="fs-small-200 text-neutral-400 "> There is no recipe to be shown</p> : recipes.map((recipe, index) => (
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
    </>
  );
};
