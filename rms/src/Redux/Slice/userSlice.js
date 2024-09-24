
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userId: null,
    ownerId: null,
    isAuthenticated: false,
  },
  routes:['ownermaster','propertymaster','rentmaster','clientmaster'],
  propertyMaster: [],
  status: "idle",
  error: "",
};

export const UpdateMaster = createAsyncThunk("updatemaster/UpdateMaster",async()=>{
  try {
    const res = axios.get('')
  } catch (error) {
    return error.message
  }
})

export const fetchPropertyMaster = createAsyncThunk(
  "propertyMaster/fetchPropertyMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/propertymaster");
    return res?.data;
  }
);

export const deleteMaster = createAsyncThunk('delete/deleteMaster',async(id)=>{
  try {
    const res = await axios.delete(`https://rsmapi.vercel.app/propertymaster/${id}`)
    if (res?.status === 200) return id;
    return `${res.status} : ${res.statusText}`;
  } catch (error) {
    return error.message
  }
})

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
      }).addCase(deleteMaster.fulfilled,(state,action)=>{
        
         state.propertyMaster = state.propertyMaster.filter(item=>item._id !== action.payload)
        
      })
  },
});

export const selectAllPropertyMaster = (state)=>state.user.propertyMaster
export const getPropertyMasterStatus = (state)=>state.user.status
export const getPropertyMasterError = (state)=>state.user.error

export const { setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
