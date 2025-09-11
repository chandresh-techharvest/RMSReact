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
  rentTranscation: [],
  status: "idle",
  error: "",
};

export const fetchOwnerMaster = createAsyncThunk(
  "user/fetchOwnerMaster",
  async () => {
    const res = await axios.get("https://rsmapi.vercel.app/ownermaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

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

export const fetchrentTranscation = createAsyncThunk(
  "user/fetchrentTranscation",
  async () => {
    console.log("Fetching rent transactions with token:", localStorage.getItem("token"));
    const res = await axios.get("https://rsmapi.vercel.app/rentTranscation", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log("Rent transactions response:", res?.data);
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
      //Fetch owner cases
      .addCase(fetchOwnerMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOwnerMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownerMaster = action.payload;
      })
      .addCase(fetchOwnerMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch property master cases
      .addCase(fetchPropertyMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPropertyMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          // For Owner role, filter by the owner's ID
          // For SuperAdmin role, show all properties
          if (state.user && state.user.userId) {
            state.propertyMaster = action.payload.filter(
              (item) => item.ownerMasters && item.ownerMasters._id === state.user.userId
            );
          } else {
            state.propertyMaster = action.payload;
          }
        } else {
          state.propertyMaster = [];
        }
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
        if (Array.isArray(action.payload)) {
          // For Owner role, filter by the owner's ID
          // For SuperAdmin role, show all clients
          if (state.user && state.user.userId) {
            state.clientMaster = action.payload.filter(
              (item) => item.ownerMasters && item.ownerMasters._id === state.user.userId
            );
          } else {
            state.clientMaster = action.payload;
          }
        } else {
          state.clientMaster = [];
        }
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
        if (Array.isArray(action.payload)) {
          // For Owner role, filter by the owner's ID
          // For SuperAdmin role, show all rents
          if (state.user && state.user.userId) {
            state.rentMaster = action.payload.filter(
              (item) => item.ownerMasters && item.ownerMasters._id === state.user.userId
            );
          } else {
            state.rentMaster = action.payload;
          }
        } else {
          state.rentMaster = [];
        }
      })
      .addCase(fetchRentMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch rent master cases
      .addCase(fetchrentTranscation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchrentTranscation.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Rent transactions fulfilled:", action.payload);
        state.rentTranscation = action.payload
      })
      .addCase(fetchrentTranscation.rejected, (state, action) => {
        state.status = "failed";
        console.log("Rent transactions rejected:", action.error.message);
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

export const selectAllOwnerMaster = (state) => state.user.ownerMaster;
export const selectAllPropertyMaster = (state) => state.user.propertyMaster;
export const selectAllClientMaster = (state) => state.user.clientMaster;
export const selectAllRentMaster = (state) => state.user.rentMaster;
export const selectAllRentTranscation = (state) => state.user.rentTranscation;
export const getPropertyMasterStatus = (state) => state.user.status;
export const getPropertyMasterError = (state) => state.user.error;

export const { setAuthenticated, setReset } = userSlice.actions;

export default userSlice.reducer;