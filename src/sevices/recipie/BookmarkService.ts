import { db } from "../firebase/config";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

export const bookmarkRecipe = async (userId: string, recipeId: string) => {
  try {
    const bookmarkCollectionRef = collection(
      doc(collection(db, "bookmark"), userId),
      "recipes"
    );
    await setDoc(doc(bookmarkCollectionRef, recipeId), {
      timestamp: new Date(Date.now()),
    });
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const unbookmarkRecipe = async (userId: string, recipeId: string) => {
  try {
    const bookmarkCollectionRef = collection(
      doc(collection(db, "bookmark"), userId),
      "recipes"
    );
    await deleteDoc(doc(bookmarkCollectionRef, recipeId));
    return true;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const isBookmarked = async (userId: string, recipeId: string) => {
  const bookmarkCollectionRef = collection(
    doc(collection(db, "bookmark"), userId),
    "recipes"
  );
  try {
    const bookmarkSnap = await getDoc(
      doc(bookmarkCollectionRef, recipeId)
    );
    if (bookmarkSnap.exists()) return true;
    return false;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getAllBookmarksByUserID = async (userId: string) => {
  const bookmarks: any = [];

  const bookmarkCollectionRef = collection(
    doc(collection(db, "bookmark"), userId),
    "recipes"
  );
  const bookmarkRef = query(
    bookmarkCollectionRef,
    orderBy("timestamp", "desc")
  );
  try {
    const bookmarkSnap = await getDocs(query(bookmarkRef));
    bookmarkSnap.forEach((doc) => {
      const tempData = doc.data();
      tempData.recipeID = doc.id;
      bookmarks.push(tempData);
    });
    return bookmarks;
  } catch (error: any) {
    return { error: error.message };
  }
};