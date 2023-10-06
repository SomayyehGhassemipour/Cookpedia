import React from "react";
import { Recipe } from "../../data/objects";
interface Props {
  recipesList?: Recipe[];
}
export const RecipesList: React.FC<Props> = ({ recipesList }) => {
  return <div>RecipesList:</div>;
};
