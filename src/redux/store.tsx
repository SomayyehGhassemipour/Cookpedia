import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './features/user/currentUserSlice'
const store =  configureStore({
  reducer: {
    currentUser: currentUserReducer,
  }
})

export default store