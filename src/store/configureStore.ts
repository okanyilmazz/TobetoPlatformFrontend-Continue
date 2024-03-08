import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/loadingSlice";
import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/userSlice";

const rootReducer = combineReducers({
    loading: loadingReducer,
    auth: authReducer,
    user: userReducer
});

export const globalStore = configureStore({
    reducer: rootReducer,
});