import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
};

export const fetchRecoveryPassword = createAsyncThunk(
  "recoveryPassword/fetchRecoveryPassword",
  async (values) => {
    return authApi.recoveryPassword(values);
  }
);

export const RecoveryPasswordSlice = createSlice({
  name: "recoveryPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecoveryPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecoveryPassword.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(fetchRecoveryPassword.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default RecoveryPasswordSlice.reducer;
