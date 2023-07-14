import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
};

export const fetchResetPassword = createAsyncThunk(
  "resetPassword/fetchResetPassword",
  async (email) => {
    return authApi.resetPassword(email);
  }
);

export const ResetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResetPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchResetPassword.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(fetchResetPassword.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default ResetPasswordSlice.reducer;
