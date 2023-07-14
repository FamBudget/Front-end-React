import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  error: null,
  email: null
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload
    },
    setEmail(state, action) {
      state.email = action.payload
    },
    setError(state,action) {
      state.error = action.payload
    }
  },
});
export const {setAuth, setError, setEmail} = authSlice.actions;

export default authSlice.reducer;
