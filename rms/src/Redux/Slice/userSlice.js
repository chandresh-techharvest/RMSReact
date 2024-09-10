import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isAuthenticated: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.user.isAuthenticated = action.payload.isAuthenticated;  
    },
  },
});

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
