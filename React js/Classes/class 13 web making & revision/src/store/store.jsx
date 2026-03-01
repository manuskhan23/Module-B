import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/counterSlice"
import productReducer from "./Slices/productSlice"
import AddtoCardSlice from "./Slices/AddtoCardSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

export const store = configureStore({
    reducer: {
        AnusKhan: counterReducer,
        AnusProductsApi: productReducer,
        AddtoCardSlice: persistReducer(persistConfig, AddtoCardSlice),
    }
})

export const persistor = persistStore(store)