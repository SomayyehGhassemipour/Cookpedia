import React from "react";

import { Button } from "../../sharedComponents/Button";
import { Form } from "../../sharedComponents/form/Form";
import { Icon } from "../../sharedComponents/Icon";
import { ImageUploader } from "../../sharedComponents/ImageUploader";
import { InputField } from "../../sharedComponents/InputField";
import { LineSeperator } from "../../sharedComponents/LineSeperator";
import { Shape } from "../../sharedComponents/Shape";

interface Props {
  image: any;
  title: string;
  description: string;
  cookTime: string;
  serves: string;
  origin: string;
  ingredients: string[];
  instructions: string[];
  changeHandlerInputField: any;
  getImage: any;
  addHandler: any;
  deleteHandler: any;
  changeHandlerListItem: any;
  submitHandler: any;
}
export const RecipeForm: React.FC<Props> = ({
  image,
  title,
  description,
  cookTime,
  serves,
  origin,
  ingredients,
  instructions,
  changeHandlerInputField,
  getImage,
  addHandler,
  deleteHandler,
  changeHandlerListItem,
  submitHandler,
}) => {
  return (
    <Form id="myForm" onSubmit={submitHandler}>
      <ImageUploader type="rectangle" image={image} changeHandler={getImage} />
      <h4>Title</h4>
      <InputField
        type="text"
        name="title"
        data_type="input"
        value={title}
        required={true}
        placeholder="Recipe Title"
        onChange={changeHandlerInputField}
      />
      <h4>Description</h4>
      <InputField
        type="text"
        name="description"
        data_type="textarea"
        value={description}
        placeholder="Description"
        onChange={changeHandlerInputField}
      />
      <h4>Cook Time</h4>
      <InputField
        type="text"
        name="cookTime"
        data_type="input"
        value={cookTime}
        required={true}
        placeholder="1 hour, 30 mins, etc"
        onChange={changeHandlerInputField}
      />
      <h4>Serves</h4>
      <InputField
        type="number"
        name="serves"
        data_type="input"
        value={serves}
        required={true}
        placeholder="3 people"
        onChange={changeHandlerInputField}
      />
      <h4>Origin</h4>
      <InputField
        type="text"
        name="origin"
        data_type="input"
        value={origin}
        placeholder="Location"
        onChange={changeHandlerInputField}
      />
      <LineSeperator type="horizontal" />
      <div className="ingredients flex-align-start" style={{ width: "100%" }}>
        <h4>Ingredients:</h4>
        {ingredients.map((ingredient, index) => (
          <div className="flex-row-justify-start" key={index} id={`${index}`}>
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
                type="button"
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
      <div className="instructions flex-align-start" style={{ width: "100%" }}>
        <h4>Instructions:</h4>
        {instructions.map((instruction, index) => (
          <div className="flex-row-justify-start" key={index} id={`${index}`}>
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
                type="button"
                clickHandler={(event) => deleteHandler(event, "instruction")}
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
  );
};
