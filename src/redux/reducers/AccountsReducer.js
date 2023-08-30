import {createAsyncThunk, createSlice, original} from "@reduxjs/toolkit";
import {authApi} from "../api/api";


export const fetchAccounts = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (_, {getState}) => {
        const email = getState().auth.email
        if (email != null) {
            const response = await authApi.getAccounts(email)
            return response.data
        }

    }
);
export const addAccount = createAsyncThunk(
    "Accounts/addAccount",
    async (changedValues, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.addAccount(email, changedValues)
        return response.data

    }
);
export const deleteAccount = createAsyncThunk(
    "Accounts/deleteAccount",
    async (value, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.deleteAccount(email, value)
        response.data.id = value
        return response.data;

    }
);

const initialState = {
    status: null,
    data: [],
};


export const AccountsSlice = createSlice({
    name: "Accounts",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload
        },
        delAccount(state, action) {
            let currentState = original(state)
            state.data = currentState.data.filter(t => t.id !== action.payload)

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccounts.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchAccounts.fulfilled, (state, action) => {
            state.status = "resolved";
            state.data = action.payload
        });
        builder.addCase(fetchAccounts.rejected, (state) => {
            state.status = "rejected";
        });
        builder.addCase(addAccount.fulfilled, (state, action) => {
            state.data = [...state.data, action.payload]
        });
    },
});

export const {delAccount} = AccountsSlice.actions;
export default AccountsSlice.reducer;
