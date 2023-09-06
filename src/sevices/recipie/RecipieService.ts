import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Recipe } from "../../data/objects";
import { uploadImage } from "../image/ImageService";

export const addRecipe = async (UserId: string, newRecipe: Recipe) => {
  try {
    const uploadImageResult = await uploadImage(newRecipe.image);
    newRecipe.userID = UserId;
    newRecipe.image = uploadImageResult;
    try {
      const recipeRef = await addDoc(collection(db, "recipes"), { newRecipe });
      return recipeRef;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
