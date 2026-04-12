import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import branchReducer from "./slices/branchSlice";
import branchManagerReducer from "./slices/branchManagerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
    branchManager: branchManagerReducer,
  },
});

export default store;
