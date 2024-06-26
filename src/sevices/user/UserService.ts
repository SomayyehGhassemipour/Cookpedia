import { db } from "../firebase/config";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { deleteImage, uploadImage } from "../image/ImageService";
import MOCK_DATA from "../../data/mockData.json";
import { User } from "../../model/User";

export const addUser = async (userId: string, newUser: User) => {
  try {
    const uploadAvatarResult = await uploadImage(
      newUser.avatar,
      MOCK_DATA.AVATARS_IMAGES_LOCATION_IN_FIREBASE,
      "avatar_" + newUser.userName + "_"
    );
    newUser.avatar = uploadAvatarResult;
    newUser.userID = userId;
    try {
      const userRef = await setDoc(doc(db, "users", userId), newUser);
      return userRef;
    } catch (error: any) {
      return { error: error.message };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
export const getUserDataByID = async (userId: any) => {
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
      if (prevAvatar !== "") {
        await deleteImage(prevAvatar);
      }
      try {
        const uploadAvatarResult = await uploadImage(
          updatedUserData.avatar,
          MOCK_DATA.AVATARS_IMAGES_LOCATION_IN_FIREBASE,
          "avatar_" + updatedUserData.userName + "_"
        );
        updatedUserData.avatar = uploadAvatarResult;
      } catch (error: any) {
        return { error: error.message };
      }
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

export const userQuery = async (searchedName: string) => {
  const usersData: any = [];
  const usersRef = collection(db, "users");
  if (searchedName) {
    try {
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        const tempData = doc.data();
        if (
          tempData.fullname.toLowerCase().startsWith(searchedName.toLowerCase())
        ) {
          usersData.push(tempData);
        }
      });
      return usersData;
    } catch (error: any) {
      return { error: error.message };
    }
  }
};
