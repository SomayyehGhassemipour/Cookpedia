import React from "react";
// import { useNavigate } from "react-router-dom";
import { Recipe } from "../../data/objects";
// import { Button } from "../../sharedComponents/Button";
// import { Icon } from "../../sharedComponents/Icon";
interface Props {
  recipe: Recipe;
}
export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  // let navigate = useNavigate();
  const title =
    recipe.title.length > 19 ? recipe.title.slice(0, 16) + "..." : recipe.title;
  return (
    <div
      className="image-card has-bg-img"
      style={{
        backgroundImage: `url(${recipe.image})`,
      }}
    >
      {/* <Button
        classname="small-circle-button ml-auto mt-1 mr-1"
        data_type="container"
        data_bg="circle"
        clickHandler={() => {
          navigate("create-recipe");
        }}
      >
        <Icon name="edit" size="xs" />
      </Button> */}
      <p className="card__title">{title}</p>
    </div>
  );
};
