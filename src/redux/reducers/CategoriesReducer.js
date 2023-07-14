import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
  expenseCategories: null,
  incomeCategories: null,
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
export const fetchIncomeCategories = createAsyncThunk(
  "categories/fetchIncomeCategories",
  async (_, { getState }) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.getIncomeCategories(email);
      return response.data;
    }
  }
);
export const addExpenseCategories = createAsyncThunk(
  "categories/addExpenseCategories",
  async (values, { getState }) => {
    const email = getState().auth.email;
      const response = await authApi.addExpenseCategories(email, values);
      return response.data;
  }
);
export const addIncomeCategories = createAsyncThunk(
  "categories/addIncomeCategories",
  async (values, { getState }) => {
    const email = getState().auth.email;
      const response = await authApi.addIncomeCategories(email, values);
      return response.data;
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
    builder.addCase(fetchIncomeCategories.fulfilled, (state, action) => {
      state.status = "resolved";
      state.incomeCategories = action.payload;
    });
    builder.addCase(addExpenseCategories.fulfilled, (state, action) => {
      state.status = "resolved";
      state.expenseCategories = [...state.expenseCategories, action.payload]
    });
    builder.addCase(addIncomeCategories.fulfilled, (state, action) => {
      state.status = "resolved";
      state.incomeCategories = [...state.incomeCategories, action.payload]
    });
  },
});

export default CategoriesSlice.reducer;
