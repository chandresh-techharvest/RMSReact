import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userId: null,
    ownerId: null,
    clientId: null,
    isAuthenticated: false,
  },
  propertyMaster: [],
  clientMaster: [],
  ownerMaster: [],
  rentMaster: [],
  status: "idle",
  error: "",
};

export const fetchPropertyMaster = createAsyncThunk(
  "user/fetchPropertyMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/propertymaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchRentMaster = createAsyncThunk(
  "user/fetchRentMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/rentmaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchClientMaster = createAsyncThunk(
  "user/fetchClientMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/clientmaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const deleteMaster = createAsyncThunk(
  "user/deleteMaster",
  async (id) => {
    try {
      const res = await axios.delete(
        `https://rsmapi.vercel.app/propertymaster/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res?.status === 200) return id;
      return `${res.status} : ${res.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.ownerId = action.payload.ownerId;
      state.user.clientId = action.payload.clientId;
      state.user.isAuthenticated = action.payload.isAuthenticated;
    },
    setReset: (state, action) => {
      state.ownerMaster = action.payload.ownerMaster;
      state.propertyMaster = action.payload.propertyMaster;
      state.clientMaster = action.payload.clientMaster;
      state.rentMaster = action.payload.rentMaster;
    },
  },
  extraReducers(builder) {
    builder
      // Fetch property master cases
      .addCase(fetchPropertyMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPropertyMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyMaster = []
        state.propertyMaster = action.payload.filter((item) =>item.ownerMasters._id === state.user.ownerId);
      })
      .addCase(fetchPropertyMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch client master cases
      .addCase(fetchClientMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientMaster = action.payload.filter(
          (item) => item.ownerMasters._id === state.user.ownerId
        );
      })
      .addCase(fetchClientMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch rent master cases
      .addCase(fetchRentMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRentMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentMaster = action.payload.filter(
          (item) => item.ownerMasters._id === state.user.ownerId
        );
      })
      .addCase(fetchRentMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete master case
      .addCase(deleteMaster.fulfilled, (state, action) => {
        state.propertyMaster = state.propertyMaster.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const selectAllPropertyMaster = (state) => state.user.propertyMaster;
export const selectAllClientMaster = (state) => state.user.clientMaster;
export const selectAllRentMaster = (state) => state.user.rentMaster;
export const getPropertyMasterStatus = (state) => state.user.status;
export const getPropertyMasterError = (state) => state.user.error;

export const { setAuthenticated, setReset } = userSlice.actions;

export default userSlice.reducer;
