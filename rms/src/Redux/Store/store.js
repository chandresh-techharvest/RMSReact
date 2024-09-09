import { configureStore } from "@reduxjs/toolkit";
 import userSlice from "../Slice/userSlice";


 const store = configureStore({
    reducer: userSlice
})

export default store