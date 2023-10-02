import {createAsyncThunk, createSlice, original} from "@reduxjs/toolkit";
import {authApi} from "../api/api";

const initialState = {
    status: null,
    expenseCategories: null,
    incomeCategories: null,
};

export const fetchExpenseCategories = createAsyncThunk(
    "categories/fetchExpenseCategories",
    async (_, {getState}) => {
        const email = getState().auth.email;
        if (email != null) {
            const response = await authApi.getExpenseCategories(email);
            return response.data;
        }
    }
);
export const fetchIncomeCategories = createAsyncThunk(
    "categories/fetchIncomeCategories",
    async (_, {getState}) => {
        const email = getState().auth.email;
        if (email != null) {
            const response = await authApi.getIncomeCategories(email);
            return response.data;
        }
    }
);
export const addExpenseCategories = createAsyncThunk(
    "categories/addExpenseCategories",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.addExpenseCategories(email, values);
        return response.data;
    }
);
export const addIncomeCategories = createAsyncThunk(
    "categories/addIncomeCategories",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.addIncomeCategories(email, values);
        return response.data;
    }
);
export const editIncomeCategories = createAsyncThunk(
    "categories/editIncomeCategories",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.editIncomeCategories(email, values);
        return response.data;
    }
);
export const editExpenseCategories = createAsyncThunk(
    "categories/editExpenseCategories",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.editExpenseCategories(email, values);
        return response.data;
    }
);
export const deleteExpenseCategories = createAsyncThunk(
    "categories/deleteExpenseCategories",
    async (value, {getState}) => {
        const email = getState().auth.email;
        await authApi.deleteExpenseCategories(email, value);
        return value;
    }
);
export const deleteIncomeCategories = createAsyncThunk(
    "categories/deleteIncomeCategories",
    async (value, {getState}) => {
        const email = getState().auth.email;
        await authApi.deleteIncomeCategories(email, value);
        return value;
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
        builder.addCase(editIncomeCategories.fulfilled, (state, action) => {
            let currentState = original(state)
            state.incomeCategories = currentState.incomeCategories.map(t => t.id === action.payload.id ? t = action.payload : t)
        });
        builder.addCase(editExpenseCategories.fulfilled, (state, action) => {
            let currentState = original(state)
            state.expenseCategories = currentState.expenseCategories.map(t => t.id === action.payload.id ? t = action.payload : t)
        });
        builder.addCase(deleteExpenseCategories.fulfilled, (state, action) => {
            let currentState = original(state)
            state.expenseCategories = currentState.expenseCategories.filter(t => t.id !== action.payload)
        });
        builder.addCase(deleteIncomeCategories.fulfilled, (state, action) => {
            let currentState = original(state)
            state.incomeCategories = currentState.incomeCategories.filter(t => t.id !== action.payload)
        });
    },
});

export default CategoriesSlice.reducer;
