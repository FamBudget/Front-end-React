import {createAsyncThunk, createSlice, original} from "@reduxjs/toolkit";
import {authApi} from "../api/api";

const initialState = {
    status: null,
    expenses: [],
    incomes: [],
    moving: [],
};

export const fetchExpenses = createAsyncThunk(
    "operations/fetchExpenses",
    async (query, {getState}) => {
        const email = getState().auth.email;
        if (email != null) {
            const response = await authApi.getExpenses(email, query);
            return response.data;
        }
    }
);
export const fetchIncomes = createAsyncThunk(
    "operations/fetchIncomes",
    async (query, {getState}) => {
        const email = getState().auth.email;
        if (email != null) {
            const response = await authApi.getIncomes(email, query);
            return response.data;
        }
    }
);

export const addExpense = createAsyncThunk(
    "operations/addExpense",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.addExpense(email, values);
        return response.data;
    }
);
export const addIncome = createAsyncThunk(
    "operations/addIncome",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.addIncome(email, values);
        return response.data;
    }
);
export const updateIncome = createAsyncThunk(
    "operations/updateIncome",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.updateIncome(email, values);
        return response.data;
    }
);
export const updateExpense = createAsyncThunk(
    "operations/updateExpense",
    async (values, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.updateExpense(email, values);
        return response.data;
    }
);

export const deleteIncome = createAsyncThunk(
    "operations/deleteIncome",
    async (value, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.deleteIncome(email, value);
        response.data.id = value
        return response.data;
    }
);

export const deleteExpense = createAsyncThunk(
    "operations/deleteExpense",
    async (value, {getState}) => {
        const email = getState().auth.email;
        const response = await authApi.deleteExpense(email, value);
        response.data.id = value
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
        deleteIncomes(state, action) {
            let currentState = original(state)
            state.incomes = currentState.incomes.filter(t=> t.id !==action.payload)
        } ,
        deleteExpenses(state, action) {
            let currentState = original(state)
            state.expenses = currentState.expenses.filter(t=> t.id !==action.payload)
        }
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
        builder.addCase(fetchIncomes.fulfilled, (state, action) => {
            state.status = "resolved";
            state.incomes = action.payload;
        });
        builder.addCase(updateExpense.fulfilled, (state, action) => {
            state.status = "resolved";
            let currentState = original(state)
            state.expenses = currentState.expenses.map(t=> t.id ===action.payload.id ? t = action.payload : t)
        });
        builder.addCase(updateIncome.fulfilled, (state, action) => {
            state.status = "resolved";
            let currentState = original(state)
            state.incomes = currentState.incomes.map(t=> t.id ===action.payload.id ? t = action.payload : t)
        });

    },
});

export const {setExpenses, deleteIncomes, deleteExpenses} = OperationsSlice.actions;

export default OperationsSlice.reducer;
