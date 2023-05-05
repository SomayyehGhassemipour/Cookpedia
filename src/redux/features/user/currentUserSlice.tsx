import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email:"",
  fullname:"",
  birthday:"",
  cooklevel:"",
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
    setCurrentUser : (state, action) => {
      state.userName = action.payload.userName
    }
  }
})

export const {setCurrentUser} =   currentUserSlice.actions

export  const getCurrentUser = (state: { currentUser: { userName: string; }; }) => state.currentUser.userName
export default currentUserSlice.reducer 