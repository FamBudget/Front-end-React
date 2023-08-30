import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "../api/api";


export const fetchMoving = createAsyncThunk(
    "Moving/fetchMoving",
    async (query, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.getMoving(email, query)
        return response.data
    }
);
export const addMoving = createAsyncThunk(
    "Moving/addMoving",
    async (values, {getState}) => {
        const email = getState().auth.email
        const response = await authApi.addMoving(email, values)
        return response.data
    }
);


const initialState = {
    data: [],
};


export const MovingSlice = createSlice({
    name: "Moving",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoving.fulfilled, (state, action) => {
            state.data = action.payload
        });
        builder.addCase(addMoving.fulfilled, (state, action) => {
            state.data = [...state.data, action.payload];
        });
    },

});


export default MovingSlice.reducer;
