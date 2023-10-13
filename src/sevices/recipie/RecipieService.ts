import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { Recipe } from "../../data/objects";
import { uploadImage } from "../image/ImageService";

export const addRecipe = async (UserId: string, newRecipe: Recipe) => {
  try {
    const uploadImageResult = await uploadImage(
      newRecipe.image,
      "/images/recipes/",
      "recipe_"
    );
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
      const tempData = doc.data();
      tempData.recipeID = doc.id;
      recipesData.push(tempData);
    });

    return recipesData;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getRecipe = async (recipeId: string) => {
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    const recipeSnap = await getDoc(recipeRef);
    const recipeData: any = { recipeID: recipeId, ...recipeSnap.data() };
    return recipeData;
  } catch (error: any) {
    return { error: error.message };
  }
};
