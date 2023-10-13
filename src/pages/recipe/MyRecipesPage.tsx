import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../sevices/firebase/config";
import { getAllRecipesByUserID } from "../../sevices/recipie/RecipieService";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import messages from "../../data/message.json";
import { RecipeCard } from "../../components/recipe/RecipeCard";
import { useDispatch } from "react-redux";
import { setRecipesData } from "../../redux/features/recipes/recipesSlice";
import { Recipe } from "../../data/objects";
import { useNavigate } from "react-router-dom";

export const MyRecipesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const recipesData = await getAllRecipesByUserID(userId);
          console.log(recipesData);
          setRecipes(recipesData);
          dispatch(setRecipesData(recipesData));
        } catch (error: any) {
          alert(messages.ERROR_IN_READING_RECIPIES_OF_USER + error);
        }
      } else {
        console.log("no user");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header>
        <div className="flex-row-justify-start ">
          <h2>My Recipes</h2>
          <div className="ml-auto flex-row">
            <Button data_type="container" data_bg="transparent">
              <Icon name="search" size="lg" />
            </Button>
          </div>
        </div>
      </Header>
      <CardBody classname="flex-row-wrap">
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
      </CardBody>
    </>
  );
};
