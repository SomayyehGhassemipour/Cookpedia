import { db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const addUser = async (userId: string, newUser: any) => {
  console.log(newUser);
  try {
    const userRef = await setDoc(doc(db, "users", userId), newUser);
    return userRef;
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
