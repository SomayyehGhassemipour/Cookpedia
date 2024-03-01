import { useEffect, useState } from "react";
import { Recipe } from "../model/Recipe";
import { getAllRecipesByOrder } from "../sevices/recipie/RecipieService";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import messages from "../data/message.json";
import { RecipeList } from "../components/recipe/RecipeList";
import { Button } from "../sharedComponents/Button";
import { Icon } from "../sharedComponents/Icon";

export const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getAllRecipesByOrder();
        setRecipes(recipesData as Recipe[]);
      } catch (error) {
        console.log(messages.ERROR_IN_READING_RECIPIES_OF_USER);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <h2>Cookpedia</h2>
          <div className="ml-auto flex-row">
            <Button data_type="container" data_bg="transparent">
              <Icon name="notification" size="lg" />
            </Button>
            <Button data_type="container" data_bg="transparent">
              <Icon name="bookmark" size="lg" />
            </Button>
          </div>
        </div>
        <br />
        <h4>Recent Recipes</h4>
      </Header>
      <CardBody classname="flex-align-start">
        <RecipeList recipes={recipes} />
      </CardBody>
    </>
  );
};
