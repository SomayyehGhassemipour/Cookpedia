import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleAuthProvider } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const userAuthContext = createContext<any>({} as any);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UserAuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setuser] = useState({});

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      return true;
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      return { error: error.message };
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser: any) => {
      setuser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, logInWithGoogle }}
    >
      {children}
    </userAuthContext.Provider>
  );
};
export function useUserAuth() {
  return useContext(userAuthContext);
}
