import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../data/objects";

const initialState: User = {
  userName: "",
  email: "",
  fullname: "",
  aboutme: "",
  birthday: null,
  cookLevel: "",
  country: "",
  city: "",
  phoneNumber: "",
  image: "",
  gender: "",
  facebook: "",
  instagram: "",
  twitter: "",
  joinedDate: null,
};
export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setUserCountry: (state, action) => {
      state.country = action.payload.country;
    },
    setUserCookLevel: (state, action) => {
      state.cookLevel = action.payload.cookLevel;
    },
    setUserPersonalData: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.aboutme = action.payload.aboutme;
      state.birthday = action.payload.birthday;
      state.cookLevel = action.payload.cookLevel;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.phoneNumber = action.payload.phoneNumber;
      state.image = action.payload.image;
      state.gender = action.payload.gender;
      state.facebook = action.payload.facebook;
      state.instagram = action.payload.instagram;
      state.twitter = action.payload.twitter;
      state.joinedDate = action.payload.joinedDate;
    },
  },
});

export const {
  setUserName,
  setUserCountry,
  setUserCookLevel,
  setUserEmail,
  setUserPersonalData,
} = currentUserSlice.actions;

export const getUserData = (state: {
  currentUser: {
    userName: string;
    email: string;
    fullname: string;
    aboutme: string;
    birthday: Date | null;
    cookLevel: string;
    country: string;
    city: string;
    phoneNumber: string;
    image?: string;
    gender: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    joinedDate: string | null;
  };
}) => state.currentUser;
export default currentUserSlice.reducer;
