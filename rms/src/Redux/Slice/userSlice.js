import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userId: null,
    ownerId: null,
    isAuthenticated: false,
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.ownerId = action.payload.ownerId;
      state.user.isAuthenticated = action.payload.isAuthenticated;
     }
  },
});

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
