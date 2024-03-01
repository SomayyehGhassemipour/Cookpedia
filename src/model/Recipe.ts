interface Recipe {
  userID: string;
  recipeID: string;
  image: any;
  title: string;
  description: string;
  cookTime: string;
  serves: string;
  origin: string;
  ingredients: string[];
  instructions: string[];
  createdOn: number | null;
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
  createdOn: null,
};
export type { Recipe };
export { initialRecipe };
