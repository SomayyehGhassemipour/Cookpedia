import { RecipeList } from "../../components/recipe/RecipeList";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";

export const MyRecipesPage = () => {
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
      <CardBody>
        <RecipeList />
      </CardBody>
    </>
  );
};
