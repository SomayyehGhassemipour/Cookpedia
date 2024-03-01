import { createSlice } from "@reduxjs/toolkit";
import { User, initialUser } from "../../../model/User";

const initialState: User = initialUser;
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
      state.fullname = action.payload.fullname;
      state.birthday = action.payload.birthday;
      state.phoneNumber = action.payload.phoneNumber;
      state.avatar = action.payload.avatar;
      state.gender = action.payload.gender;
    },
    setUserAccountData: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    setAllUserData: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.aboutme = action.payload.aboutme;
      state.birthday = action.payload.birthday;
      state.cookLevel = action.payload.cookLevel;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.phoneNumber = action.payload.phoneNumber;
      state.avatar = action.payload.avatar;
      state.gender = action.payload.gender;
      state.facebook = action.payload.facebook;
      state.instagram = action.payload.instagram;
      state.twitter = action.payload.twitter;
      state.joinedOn = action.payload.joinedOn;
    },
    setUserDataEmpty: (state) => {
      state = initialUser;
    },
  },
});

export const {
  setUserName,
  setUserCountry,
  setUserCookLevel,
  setUserEmail,
  setUserPersonalData,
  setAllUserData,
  setUserDataEmpty,
} = currentUserSlice.actions;

export const getUserData = (state: { currentUser: User }) => state.currentUser;
export default currentUserSlice.reducer;
