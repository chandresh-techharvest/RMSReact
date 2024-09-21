import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userId: null,
    ownerId: null,
    isAuthenticated: false,
  },
  propertyMaster: [],
  status: "idle",
  error: "",
};

export const fetchPropertyMaster = createAsyncThunk(
  "propertyMaster/fetchPropertyMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/propertymaster");
    return res?.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.ownerId = action.payload.ownerId;
      state.user.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPropertyMaster.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPropertyMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
         state.propertyMaster = action.payload          
      })
      .addCase(fetchPropertyMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPropertyMaster = (state)=>state.user.propertyMaster
export const getPropertyMasterStatus = (state)=>state.user.propertyMaster
export const getPropertyMasterError = (state)=>state.user.propertyMaster

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
