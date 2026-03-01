import { createSlice } from "@reduxjs/toolkit"

const initialstate = {
    cart: []
}

const AddtoCardSlice = createSlice({
    name: "AddtoCard",
    initialState: initialstate,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        clearCart: (state) => {
            state.cart = []
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cart = state.cart.filter(item => item.id !== action.payload);
            }
        }
    }
})

export default AddtoCardSlice.reducer
export const { addToCart, clearCart, removeItem, incrementQuantity, decrementQuantity } = AddtoCardSlice.actions
