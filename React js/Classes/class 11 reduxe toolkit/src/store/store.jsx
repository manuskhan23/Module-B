import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterReducer";

const store = configureStore({
  reducer: {
    counterReducer,
  },
});

export default store;
