import React, { useRef, useState } from "react";
import { Recipe } from "../model/Recipe";
import { recipeQuery } from "../sevices/recipie/RecipieService";
import { userQuery } from "../sevices/user/UserService";
import { Button } from "../sharedComponents/Button";
import { CardBody } from "../sharedComponents/card/CardBody";
import { Header } from "../sharedComponents/Header";
import { InputField } from "../sharedComponents/InputField";
import { LineSeperator } from "../sharedComponents/LineSeperator";
import messages from "../data/message.json";
import { RecipeList } from "../components/recipe/RecipeList";

export const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState("Recipes");
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchedList, setSearchedlist] = useState<Recipe[]>([]);

  const refRecipeBtn: any = useRef(null);
  const refPeopleBtn: any = useRef(null);

  const activeTabHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.innerText === "Recipes"
      ? setActiveTab("Recipes")
      : setActiveTab("People");
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    if (activeTab === "Recipes") {
      try {
        const recipes = await recipeQuery(event.target.value);
        console.log(recipes);
        setSearchedlist(recipes);
      } catch (error) {
        console.log(messages.FETCH_RECIPES_SEARCHED_LIST_ERORR);
      }
    } else {
      const people = await userQuery(event.target.value);
      console.log(people);
      setSearchedlist(people);
    }
  };

  return (
    <>
      <Header>
        <div className="flex-row-justify-start">
          <h2>Discover</h2>
        </div>
      </Header>
      <CardBody classname="flex-align-start">
        <InputField
          type="text"
          name="search-input"
          data_type="input"
          data_icon="search"
          placeholder="Search for Recipes or Chef"
          value={searchItem}
          onChange={handleOnChange}
        />

        <LineSeperator type="horizontal" />

        <div className="flex-row-justify-around">
          <Button
            data_type="container"
            data_bg="transparent"
            data_active={activeTab === "Recipes" ? true : false}
            clickHandler={activeTabHandler}
            reference={refRecipeBtn}
          >
            <h4>Recipes</h4>
          </Button>
          <LineSeperator type="vertical" />
          <Button
            data_type="container"
            data_bg="transparent"
            data_active={activeTab === "People" ? true : false}
            clickHandler={activeTabHandler}
            reference={refPeopleBtn}
          >
            <h4>People</h4>
          </Button>
        </div>
        <LineSeperator type="horizontal" />
        <RecipeList recipes={searchedList} />
      </CardBody>
    </>
  );
};
