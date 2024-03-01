import React, { useEffect, useState } from "react";
import { getRecipe, updateRecipe } from "../../sevices/recipie/RecipieService";
import { Button } from "../../sharedComponents/Button";
import { CardBody } from "../../sharedComponents/card/CardBody";
import { Header } from "../../sharedComponents/Header";
import { Icon } from "../../sharedComponents/Icon";
import { RecipeForm } from "../../components/recipe/RecipeForm";
import messages from "../../data/message.json";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe, initialRecipe } from "../../model/Recipe";
import { Loading } from "../../sharedComponents/Loading";

export const EditRecipePage = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [state, setState] = useState<Recipe>(initialRecipe);
  const [prevRecipeImage, setPrevRecipeImage] = useState("");

  useEffect(() => {
    const fetchRecipe = async (id: any) => {
      try {
        const recipeData = await getRecipe(id);
        setState(recipeData);
        setPrevRecipeImage(recipeData.image);
      } catch (error) {
        console.log(messages.GET_RECIPE_ERROR_MESAGE, error);
      }
    };
    fetchRecipe(id);
  }, [id]);

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

  const updateHandler = async (event: any) => {
    event.preventDefault();
    try {
      await updateRecipe(state.recipeID, state, prevRecipeImage);
    } catch (error: any) {
      alert(messages.ERROR_IN_ADDING_RECIPIE + error);
    }
    setState(initialRecipe);
    navigate("/user/my-recipes");
  };

  const changeHandlerInputField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = event.target.name;
    setState({ ...state, [field]: event.target.value });
  };

  if (!state) return <Loading />;
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
              <p>Save</p>
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
          submitHandler={updateHandler}
        />
      </CardBody>
    </>
  );
};
