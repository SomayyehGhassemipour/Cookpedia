import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { RecipeList } from "../../components/recipe/RecipeList";
import { Recipe } from "../../model/Recipe";
import { auth } from "../../sevices/firebase/config";
import { getAllRecipesByUserID } from "../../sevices/recipie/RecipieService";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import MESSAGES from "../../data/message.json";

import { Loading } from "../../sharedComponents/Loading";

export const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId: string = user.uid;
        try {
          const recipesData = await getAllRecipesByUserID(userId);
          setRecipes(recipesData);
        } catch (error: any) {
          alert(MESSAGES.ERROR_IN_READING_RECIPIES_OF_USER + error);
        }
      } else {
        console.log(MESSAGES.NO_LOGGED_IN_USER);
      }
    });
    return () => unsubscribe();
  }, []);
  if (!recipes) return <Loading />;
  return (
    <>
      <Header>
        <div className="flex-row-justify-start ">
          <h2>My Recipes</h2>
          {/* <div className="ml-auto flex-row">
            <Button data_type="container" data_bg="transparent">
              <Icon name="search" size="lg" />
            </Button>
          </div> */}
        </div>
      </Header>
      <CardBody>
        <RecipeList recipes={recipes} />
      </CardBody>
    </>
  );
};
