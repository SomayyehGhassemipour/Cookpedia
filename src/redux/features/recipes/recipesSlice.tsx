import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../../model/Recipe";

const initialState: Recipe[] | undefined = [];

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipesData: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setRecipesData } = recipesSlice.actions;

export const getRecipesData = (state: { recipes: Recipe[] }) => state.recipes;
export default recipesSlice.reducer;
