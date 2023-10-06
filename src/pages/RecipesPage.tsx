import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../sevices/firebase/config";
import { getAllRecipesByUserID } from "../sevices/recipie/RecipieService";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import messages from "../data/message.json";
import { RecipeCard } from "../components/recipe/RecipeCard";
import { useDispatch } from "react-redux";
import { setRecipesData } from "../redux/features/recipies/recipesSlice";
import { Recipe } from "../data/objects";
import { LineSeperator } from "../sharedComponents/LineSeperator";

export const RecipesPage = () => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const recipesData = await getAllRecipesByUserID(userId);
          setRecipes(recipesData);
          dispatch(setRecipesData({ data: recipesData }));
        } catch (error: any) {
          alert(messages.ERROR_IN_READING_RECIPIES_OF_USER + error);
        }
      } else {
        console.log("no user");
      }
    });
    return () => unsubscribe();
  }, [db]);
  return (
    <>
      <Header>
        <div className="flex-row-justify-start ">
          <h2>My Recipes</h2>
          <div className="ml-auto" style={{ display: "flex" }}>
            <Button data_type="container" data_bg="transparent">
              <Icon name="search" size="lg" />
            </Button>
            <Button data_type="container" data_bg="transparent">
              <Icon name="more" />
            </Button>
          </div>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <div className="flex-row-justify-space-between flex-wrap">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </CardBody>
    </>
  );
};
