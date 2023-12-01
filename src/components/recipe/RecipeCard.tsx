import React from "react";

import { Recipe } from "../../model/Recipe";

interface Props {
  recipe: Recipe;
}
export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const title =
    recipe.title.length > 19 ? recipe.title.slice(0, 16) + "..." : recipe.title;
  return (
    <div
      className="image-card has-bg-img"
      style={{
        backgroundImage: `url(${recipe.image})`,
      }}
    >
      <p className="card__title">{title}</p>
    </div>
  );
};
