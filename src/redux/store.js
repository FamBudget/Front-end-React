import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import RegistrationReducer from "./reducers/RegistrationReducer";
import ResetPasswordReducer from "./reducers/ResetPasswordReducer";
import RecoveryPasswordReducer from "./reducers/RecoveryPasswordReducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    registration: RegistrationReducer,
    resetPassword: ResetPasswordReducer,
    recoveryPassword: RecoveryPasswordReducer,
  },
});
