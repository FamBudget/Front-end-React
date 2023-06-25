import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  expenses: null,
  incomes: null,
  moving: null,
};

export const fetchExpenses = createAsyncThunk(
  "operations/fetchExpenses",
  async (_, { getState }) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.getExpenses(email);
      return response.data;
    }
  }
);

export const addExpense = createAsyncThunk(
  "operations/addExpense",
  async (values, { getState }) => {
    const email = getState().auth.email;
    const response = await authApi.addExpense(email, values);
    return response.data;
  }
);

export const OperationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.expenses = [...state.expenses, action.payload];
    });
  },
});

export const { setExpenses } = OperationsSlice.actions;

export default OperationsSlice.reducer;
