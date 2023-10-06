import React from "react";
import { Recipe } from "../../data/objects";
interface Props {
  recipe: Recipe;
}
export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div
      className="image-card has-bg-img"
      style={{
        backgroundImage: `url(${recipe.image})`,
      }}
    >
      <p className="card__title">{recipe.title}</p>
    </div>
  );
};
