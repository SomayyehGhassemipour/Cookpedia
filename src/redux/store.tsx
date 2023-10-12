import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/users/currentUserSlice";
import recipesReducer from "./features/recipes/recipesSlice";
const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    recipes: recipesReducer,
  },
});

export default store;
