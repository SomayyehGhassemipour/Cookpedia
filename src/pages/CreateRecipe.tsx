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

export const CreateRecipe = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    image: null,
    title: "",
    description: "",
    cookTime: "",
    serves: "",
    origin: "",
    ingredients: [""],
    instructions: [""],
  });

  const getImage = (event: any) => {
    const image = event.target.files[0];
    if (image) setState({ ...state, image: image });
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

  const changeHandler = (
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

  const submitHandler = () => {
    console.log("submited!");
  };
  return (
    <div className="container">
      <Card classname="flex-justify-start">
        <Header>
          <div className="flex-row-justify-start">
            <Button
              data_type="container"
              data_bg="transparent"
              clickHandler={() => navigate("/profile")}
            >
              <Icon name="close" size="lg" />
            </Button>
            <h2>Create Recipe</h2>
          </div>
        </Header>
        <CardBody>
          <Form id="myForm" onSubmit={submitHandler}>
            <ImageUploader image={state.image} changeHandler={getImage} />
            <h4>Title</h4>
            <InputField
              type="text"
              data_type="input"
              value={state.title}
              placeholder="Recipe Title"
              onChange={(event: any) =>
                setState({ ...state, title: event.target.value })
              }
            />
            <h4>Description</h4>
            <InputField
              type="text"
              data_type="textarea"
              value={state.description}
              placeholder="Description"
              onChange={(event: any) =>
                setState({ ...state, description: event.target.value })
              }
            />
            <h4>Cook Time</h4>
            <InputField
              type="text"
              data_type="input"
              value={state.cookTime}
              placeholder="1 hour, 30 mins, etc"
              onChange={(event: any) =>
                setState({ ...state, cookTime: event.target.value })
              }
            />
            <h4>Serves</h4>
            <InputField
              type="text"
              data_type="input"
              value={state.serves}
              placeholder="3 people"
              onChange={(event: any) =>
                setState({ ...state, serves: event.target.value })
              }
            />
            <h4>Origin</h4>
            <InputField
              type="text"
              data_type="input"
              value={state.origin}
              placeholder="Location"
              onChange={(event: any) =>
                setState({ ...state, origin: event.target.value })
              }
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
                    onChange={(event: any) =>
                      changeHandler(event, "ingredient", index)
                    }
                  />
                  <div className="text-primary-600">
                    <Button
                      data_type="container"
                      data_bg="transparent"
                      clickHandler={(event) =>
                        deleteHandler(event, "ingredient")
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
                  <Icon name="settings" size="lg" />
                  <Shape type="circle">
                    {" "}
                    <div>{index + 1}</div>
                  </Shape>
                  <InputField
                    type="text"
                    data_type="input"
                    value={instruction}
                    placeholder={`Instruction ${index + 1}`}
                    onChange={(event: any) =>
                      changeHandler(event, "instruction", index)
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
        <CardAction>
          <div className="flex-row-justify-start">
            <Button data_bg="primary" data_type="container">
              <p>Save</p>
            </Button>
            <Button
              data_bg="google"
              data_type="container"
              type="submit"
              form="myForm"
            >
              <p>Publish</p>
            </Button>
          </div>
        </CardAction>
      </Card>
    </div>
  );
};
