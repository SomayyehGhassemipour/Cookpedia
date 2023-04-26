import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCukFM19VRJE6GX0bWSoOb4pHX4GA-bHxM",
  authDomain: "cookpedia-f76d4.firebaseapp.com",
  projectId: "cookpedia-f76d4",
  storageBucket: "cookpedia-f76d4.appspot.com",
  messagingSenderId: "865712361685",
  appId: "1:865712361685:web:e685554b1f280fced0d25c",
  measurementId: "G-19L3N7M8T7"
};

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export {auth, googleAuthProvider, facebookAuthProvider}