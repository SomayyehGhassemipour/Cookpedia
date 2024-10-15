import MESSAGES from "../data/message.json";
import { getRecipe } from "../sevices/recipie/RecipieService";

export const getRecipesBookmarked = async (data: any[]) => {
  try {
    const fetchRecipeData = async (recipeId: any) => {
      try {
        const recipeData = await getRecipe(recipeId as string);
        return recipeData;
      } catch (error) {
        console.error(MESSAGES.FETCH_USER_INFO_ERORR, error);
        return null;
      }
    };

    // Use Promise.all to wait for all fetches to complete
    const recipes = await Promise.all(
      data.map(async (item: any) => await fetchRecipeData(item.recipeID))
    );

    // Filter out any null values (in case fetchRecipeData failed)
    return recipes.filter(recipe => recipe !== null);
  } catch (error) {
    console.error("Error in getRecipesBookmarked:", error);
    return [];
  }
};