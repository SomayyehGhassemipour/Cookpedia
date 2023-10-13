import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { uploadImage } from "../image/ImageService";

export const addUser = async (userId: string, newUser: any) => {
  try {
    const uploadImageResult = await uploadImage(
      newUser.avatar,
      "/images/avatars/",
      "avatar_" + newUser.userName + "_"
    );
    newUser.avatar = uploadImageResult;
    try {
      console.log(newUser);
      const userRef = await setDoc(doc(db, "users", userId), newUser);
      return userRef;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getUserData = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  try {
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return userData;
  } catch (error: any) {
    return { error: error.message };
  }
};
