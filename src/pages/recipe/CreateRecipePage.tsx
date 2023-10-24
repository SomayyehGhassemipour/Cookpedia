import { useNavigate } from "react-router-dom";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { useState } from "react";
import { Recipe } from "../../data/objects";
import { addRecipe, addRecipeId } from "../../sevices/recipie/RecipieService";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";
import messages from "../../data/message.json";
import { RecipeForm } from "./RecipeForm";

export const CreateRecipePage = () => {
  const userAuth = useUserAuth();
  const UserID = userAuth.user.uid;

  const navigate = useNavigate();

  const initialState: Recipe = {
    recipeID: "",
    userID: "",
    image: null,
    title: "",
    description: "",
    cookTime: "",
    serves: "",
    origin: "",
    ingredients: [],
    instructions: [],
  };
  const [state, setState] = useState<Recipe>(initialState);

  const getImage = (event: any) => {
    const image = event.target.files[0];
    if (image) {
      setState({ ...state, image: image });
      event.target.files = null;
    }
  };
  const addHandler = (type: string) => {
    type === "ingredient"
      ? setState({ ...state, ingredients: [...state.ingredients, ""] })
      : setState({ ...state, instructions: [...state.instructions, ""] });
  };

  const deleteHandler = (
    event: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    const index = event.currentTarget.parentElement?.parentElement?.id;

    type === "ingredient"
      ? setState((current) => ({
          ...state,
          ingredients: current.ingredients.filter((_, i) => `${i}` !== index),
        }))
      : setState((current) => ({
          ...state,
          instructions: current.instructions.filter((_, i) => `${i}` !== index),
        }));
  };

  const changeHandlerListItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
    index: number
  ) => {
    let tempArray =
      type === "ingredient" ? state.ingredients : state.instructions;
    tempArray[index] = event.target.value;

    type === "ingredient"
      ? setState((current) => ({ ...current, ingredients: tempArray }))
      : setState((current) => ({ ...current, instructions: tempArray }));
  };

  const publishHandler = async (event: any) => {
    event.preventDefault();
    try {
      const recipeId = await addRecipe(UserID, state);
      addRecipeId(recipeId);
    } catch (error: any) {
      alert(messages.ERROR_IN_ADDING_RECIPIE + error);
    }
    setState(initialState);
    navigate("/user/my-recipes");
  };

  const changeHandlerInputField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = event.target.name;
    setState({ ...state, [field]: event.target.value });
  };
  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <Button
            data_type="container"
            data_bg="transparent"
            clickHandler={() => navigate(-1)}
          >
            <Icon name="close" size="lg" />
          </Button>
          <h2>Create Recipe</h2>
          <div className="ml-auto flex-row">
            <Button
              data_bg="primary"
              data_type="container"
              form="myForm"
              type="submit"
            >
              <p>Publish</p>
            </Button>
          </div>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <RecipeForm
          {...state}
          changeHandlerInputField={changeHandlerInputField}
          changeHandlerListItem={changeHandlerListItem}
          getImage={getImage}
          addHandler={addHandler}
          deleteHandler={deleteHandler}
          submitHandler={publishHandler}
        />
      </CardBody>
    </>
  );
};
