import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
  expenseCategories: null,
};

export const fetchExpenseCategories = createAsyncThunk(
  "categories/fetchExpenseCategories",
  async (_, { getState }) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.getExpenseCategories(email);
      return response.data;
    }
  }
);

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenseCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchExpenseCategories.fulfilled, (state, action) => {
      state.status = "resolved";
      state.expenseCategories = action.payload;
    });
    builder.addCase(fetchExpenseCategories.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default CategoriesSlice.reducer;
