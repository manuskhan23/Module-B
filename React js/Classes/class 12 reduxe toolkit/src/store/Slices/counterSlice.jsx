import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, actions) => {
            state.count = ++state.count
        },
        decrement: (state, actions) => {
            state.count = --state.count
        },
        reset: (state, actions) => {
            state.count = 0
        }
    }
})

const { actions, reducer } = counterSlice
const { increment, decrement, reset } = actions
export { increment, decrement, reset }
export default reducer