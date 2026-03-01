import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    allProducts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
}

const productSlice = createSlice({
    name: "productsApi",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.pending, (state, action) => {
            state.allProducts = []
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        builder.addCase(fetchProductData.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.allProducts = action.payload
        })
        builder.addCase(fetchProductData.rejected, (state, action) => {
            state.allProducts = []
            state.isSuccess = false
            state.isLoading = false
            state.isError = true
        })
    }
})

export const fetchProductData = createAsyncThunk('productsApi/fetch', async () => {
    try {
        const res = await axios.get("https://fakestoreapi.com/products")
        return res.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
})

export default productSlice.reducer
