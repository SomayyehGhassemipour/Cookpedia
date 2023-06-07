import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email:"",
  fullname:"",
  birthday:"",
  cookLevel:"",
  country:"",
  phoneNumber:"",
  image:"",
  gender:"",
  facebook:""
}
export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserName : (state, action) => {
      state.userName = action.payload.userName
    },
    setUserEmail : (state, action) => {
      state.email = action.payload.email
    },
    setUserCountry : (state, action) => {
      state.country = action.payload.country
    },
    setUserCookLevel : (state, action) => {
      state.cookLevel = action.payload.cookLevel
    },
    setUserPersonalData : (state, action) => {
      state.fullname = action.payload.fullname;
      state.phoneNumber = action.payload.phoneNumber;
      state.birthday = action.payload.birthday;
      state.gender = action.payload.gender;
    }
  }
})

export const {setUserName, setUserCountry, setUserCookLevel, setUserEmail, setUserPersonalData} =   currentUserSlice.actions

export  const getUserData = (state: { currentUser: { userName: string,email: string,
fullname: string,
birthday: string,
cookLevel: string,
country: string,
phoneNumber: string,
image: string,
gender: string,
facebook: string  }; }) => state.currentUser
export default currentUserSlice.reducer 