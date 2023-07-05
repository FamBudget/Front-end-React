import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";

const initialState = {
  status: null,
  expenses: [],
  incomes: [],
  moving: [],
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
export const addIncome = createAsyncThunk(
  "operations/addIncome",
  async (values, { getState }) => {
    const email = getState().auth.email;
    const response = await authApi.addIncome(email, values);
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
    builder.addCase(fetchExpenses.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.status = "resolved";
      state.expenses = action.payload;
    });
    builder.addCase(fetchExpenses.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(addIncome.fulfilled, (state, action) => {
      state.incomes = [...state.incomes, action.payload];
    });
  },
});

export const { setExpenses } = OperationsSlice.actions;

export default OperationsSlice.reducer;
