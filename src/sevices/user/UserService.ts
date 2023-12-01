import { db } from "../firebase/config";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteImage, uploadImage } from "../image/ImageService";
import mockData from "../../data/mockData.json";
import { User } from "../../model/User";

export const addUser = async (userId: string, newUser: User) => {
  try {
    console.log(newUser.avatar);
    const uploadAvatarResult = await uploadImage(
      newUser.avatar,
      mockData.AVATARS_IMAGES_LOCATION_IN_FIREBASE,
      "avatar_" + newUser.userName + "_"
    );
    newUser.avatar = uploadAvatarResult;

    console.log(newUser.avatar);

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
export const updateUserData = async (
  userId: any,
  updatedUserData: User,
  prevAvatar: any
) => {
  try {
    if (updatedUserData.avatar instanceof Object) {
      console.log(prevAvatar);
      if (prevAvatar !== "") {
        await deleteImage(prevAvatar);
      }
      const uploadAvatarResult = await uploadImage(
        updatedUserData.avatar,
        mockData.AVATARS_IMAGES_LOCATION_IN_FIREBASE,
        "avatar_" + updatedUserData.userName + "_"
      );
      updatedUserData.avatar = uploadAvatarResult;
    }
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, { ...updatedUserData });
      return true;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
