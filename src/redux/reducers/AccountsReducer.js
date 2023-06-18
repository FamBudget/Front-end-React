import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
    async (values, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.addAccount(email, values)
        return response.data

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


export default AccountsSlice.reducer;
