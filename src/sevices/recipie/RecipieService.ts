import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { Recipe } from "../../data/objects";
import { deleteImage, uploadImage } from "../image/ImageService";

export const addRecipe = async (UserId: string, newRecipe: Recipe) => {
  console.log(newRecipe);
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
      return recipeRef.id;
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
    const recipeData: any = { ...recipeSnap.data() };
    return recipeData;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateRecipe = async (
  recipeId: string,
  updatedRecipe: Recipe,
  prevImage: any
) => {
  try {
    if (updatedRecipe.image instanceof Object) {
      await deleteImage(prevImage);
      const uploadImageResult = await uploadImage(
        updatedRecipe.image,
        "/images/recipes/",
        "recipe_"
      );
      updatedRecipe.image = uploadImageResult;
    }
    const recipeRef = doc(db, "recipes", recipeId);
    try {
      await updateDoc(recipeRef, { ...updatedRecipe });
      return true;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const addRecipeId = async (recipeId: string | any) => {
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    await updateDoc(recipeRef, { recipeID: recipeId });
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteRecipe = async (recipeId: string) => {
  const recipeRef = doc(db, "recipes", recipeId);
  try {
    await deleteDoc(recipeRef);
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};
