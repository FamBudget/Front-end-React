import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/api";
import {setEmail} from "./AuthReducer";

const initialState = {
  currency: '',
  email: '',
  firstName: '',
  id: undefined,
  lastName: ''
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, {getState}) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.getUserInfo(email);
      return response.data;
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, {getState}) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.deleteUser(email);
      return response.data;
    }
  }
);
export const editUser = createAsyncThunk(
  "user/editUser",
  async (values, {getState}) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.editUserInfo(email, values);
      return response.data;
    }
  }
);
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (values, {getState}) => {
    const email = getState().auth.email;
    if (email != null) {
      const response = await authApi.changePassword(email, values);
      return response.data;
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.id = action.payload.id;
      state.currency = action.payload.currency;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.id = action.payload.id;
      state.currency = action.payload.currency;
      setEmail(action.payload.email)
    });
  },
});

export default UserSlice.reducer;
