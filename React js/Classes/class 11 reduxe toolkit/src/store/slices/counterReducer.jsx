import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCounter: (state, action) => {
      state.counter == ++state.counter;
    },
    delCounter: (state, action) => {
      state.counter == --state.counter;
    },
  },
});

const {reducer,actions} = counterSlice;

export const {addCounter,delCounter} = actions

export default reducer