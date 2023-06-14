import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/api";


export const fetchAccounts = createAsyncThunk(
    "Accounts/fetchAccounts",
    async (_, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.Accounts(email)
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
    },
});


export default AccountsSlice.reducer;
