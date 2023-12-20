interface Recipe {
  userID: string;
  recipeID: any;
  image: any;
  title: string;
  description: string;
  cookTime: string;
  serves: string;
  origin: string;
  ingredients: string[];
  instructions: string[];
}

const initialRecipe: Recipe = {
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
export type { Recipe };
export { initialRecipe };
