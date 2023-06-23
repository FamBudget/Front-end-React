import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
  currency: null,
};

export const fetchRegistration = createAsyncThunk(
  "registration/fetchRegistration",
  async (values) => {
    return authApi.registration(values);
  }
);

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRegistration.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(fetchRegistration.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { setCurrency } = RegistrationSlice.actions;

export default RegistrationSlice.reducer;
