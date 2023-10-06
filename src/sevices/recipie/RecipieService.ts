import { db } from "../firebase/config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Recipe } from "../../data/objects";
import { uploadImage } from "../image/ImageService";

export const addRecipe = async (UserId: string, newRecipe: Recipe) => {
  try {
    const uploadImageResult = await uploadImage(newRecipe.image);
    newRecipe.userID = UserId;
    newRecipe.image = uploadImageResult;
    try {
      const recipeRef = await addDoc(collection(db, "recipes"), newRecipe);
      return recipeRef;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getAllRecipesByUserID = async (userId: string) => {
  try {
    const recipesData: any = [];
    const recipesRef = query(
      collection(db, "recipes"),
      where("userID", "==", userId)
    );

    const querySnapshot = await getDocs(recipesRef);
    querySnapshot.forEach((doc) => {
      recipesData.push(doc.data());
    });

    return recipesData;
  } catch (error: any) {
    return { error: error.message };
  }
};
