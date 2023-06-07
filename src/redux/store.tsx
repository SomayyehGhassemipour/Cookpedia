import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './features/users/currentUserSlice'
const store =  configureStore({
  reducer: {
    currentUser: currentUserReducer,
  }
})

export default store