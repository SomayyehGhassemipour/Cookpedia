import { useNavigate } from "react-router-dom";
import { Button } from "../sharedComponents/Button";
import { Card } from "../sharedComponents/card/Card";
import { CardAction } from "../sharedComponents/card/CardAction";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { Icon } from "../sharedComponents/Icon";
import { InputField } from "../sharedComponents/InputField";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import { Shape } from "../sharedComponents/Shape";
import { useState } from "react";
import { Form } from "../sharedComponents/form/Form";
import { ImageUploader } from "../sharedComponents/ImageUploader";
import { Recipe } from "../data/objects";
import { addRecipe } from "../sevices/recipie/RecipieService";
import { useUserAuth } from "../sevices/firebase/AthenicationService";
import messages from "../data/message.json";

export const CreateRecipe = () => {
  const userAuth = useUserAuth();
  const UserID = userAuth.user.uid;

  const navigate = useNavigate();

  const initialState: Recipe = {
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

  const publishHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addRecipe(UserID, state);
    } catch (error: any) {
      alert(messages.ERROR_IN_ADDING_RECIPIE + error);
    }
    setState(initialState);
    navigate("/profile");
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
            clickHandler={() => navigate("/user/home")}
          >
            <Icon name="close" size="lg" />
          </Button>
          <h2>Create Recipe</h2>
          <div className="ml-auto" style={{ display: "flex", gap: "1rem" }}>
            <Button
              data_bg="primary"
              data_type="container"
              form="myForm"
              type="submit"
            >
              <p>Save</p>
            </Button>
            <Button
              data_bg="google"
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
        <Form id="myForm" onSubmit={publishHandler}>
          <ImageUploader image={state.image} changeHandler={getImage} />
          <h4>Title</h4>
          <InputField
            type="text"
            name="title"
            data_type="input"
            value={state.title}
            required={true}
            placeholder="Recipe Title"
            onChange={changeHandlerInputField}
          />
          <h4>Description</h4>
          <InputField
            type="text"
            name="description"
            data_type="textarea"
            value={state.description}
            placeholder="Description"
            onChange={changeHandlerInputField}
          />
          <h4>Cook Time</h4>
          <InputField
            type="text"
            name="cookTime"
            data_type="input"
            value={state.cookTime}
            required={true}
            placeholder="1 hour, 30 mins, etc"
            onChange={changeHandlerInputField}
          />
          <h4>Serves</h4>
          <InputField
            type="text"
            name="serves"
            data_type="input"
            value={state.serves}
            required={true}
            placeholder="3 people"
            onChange={changeHandlerInputField}
          />
          <h4>Origin</h4>
          <InputField
            type="text"
            name="origin"
            data_type="input"
            value={state.origin}
            placeholder="Location"
            onChange={changeHandlerInputField}
          />
          <LineSeperator type="horizontal" />
          <div
            className="ingredients flex-align-start"
            style={{ width: "100%" }}
          >
            <h4>Ingredients:</h4>
            {state.ingredients.map((ingredient, index) => (
              <div
                className="flex-row-justify-start"
                key={index}
                id={`${index}`}
              >
                <Icon name="settings" size="lg" />
                <Shape type="circle">
                  {" "}
                  <div>{index + 1}</div>
                </Shape>
                <InputField
                  type="text"
                  data_type="input"
                  value={ingredient}
                  placeholder={`Ingredient ${index + 1}`}
                  required={true}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    changeHandlerListItem(event, "ingredient", index)
                  }
                />
                <div className="text-primary-600">
                  <Button
                    data_type="container"
                    data_bg="transparent"
                    clickHandler={(event) => deleteHandler(event, "ingredient")}
                  >
                    <Icon name="trash" size="lg" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              data_bg="secondary"
              data_type="container"
              clickHandler={(event) => addHandler("ingredient")}
            >
              <p>+ Add Ingredients</p>
            </Button>
          </div>
          <LineSeperator type="horizontal" />
          <div
            className="instructions flex-align-start"
            style={{ width: "100%" }}
          >
            <h4>Instructions:</h4>
            {state.instructions.map((instruction, index) => (
              <div
                className="flex-row-justify-start"
                key={index}
                id={`${index}`}
              >
                <Shape type="circle">
                  {" "}
                  <div>{index + 1}</div>
                </Shape>
                <InputField
                  type="text"
                  data_type="textarea"
                  value={instruction}
                  required={true}
                  placeholder={`Instruction ${index + 1}`}
                  onChange={(event: any) =>
                    changeHandlerListItem(event, "instruction", index)
                  }
                />
                <div className="text-primary-600">
                  <Button
                    data_type="container"
                    data_bg="transparent"
                    clickHandler={(event) =>
                      deleteHandler(event, "instruction")
                    }
                  >
                    <Icon name="trash" size="lg" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              data_bg="secondary"
              data_type="container"
              clickHandler={(event) => addHandler("instruction")}
            >
              <p>+ Add Instructions</p>
            </Button>
          </div>
        </Form>
      </CardBody>
      {/* <CardAction>
        <div className="flex-row-justify-start">
          <Button
            data_bg="primary"
            data_type="container"
            form="myForm"
            type="submit"
          >
            <p>Publish</p>
          </Button>
        </div>
      </CardAction> */}
    </>
  );
};
