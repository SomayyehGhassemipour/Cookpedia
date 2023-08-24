import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export const addUser = async (UserId: string, newUser: any) => {
  console.log(newUser);
  try {
    const userRef = await setDoc(doc(db, "users", UserId), newUser);
    return userRef;
  } catch (error: any) {
    return { error: error.message };
  }
};
