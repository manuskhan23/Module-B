import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice"
import productReducer from "./Slices/productSlice"

export const store = configureStore({
    reducer: {
        AnusKhan: counterReducer,
        AnusProductsApi: productReducer,
    }
})