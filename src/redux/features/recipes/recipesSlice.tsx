import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../../data/objects";

const initialState: Recipe[] | undefined = [];

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipesData: (state, action) => {
      console.log(action.payload);
      state = action.payload;
    },
  },
});

export const { setRecipesData } = recipesSlice.actions;

export const getRecipesData = (state: { recipes: Recipe[] }) => state.recipes;
export default recipesSlice.reducer;
