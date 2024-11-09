import { createSlice, configureStore } from '@reduxjs/toolkit';

const ordersCounter = createSlice({
  name: 'orders',
  initialState: {
    value: 0,
  },
  reducers: {
    addMenu: (state) => {
      state.value += 1;
    },
    removeMenu: (state) => {
      state.value -= 1;
    },
    clearMenu: (state) => {
      state.value = 0;
    },
  },
});

export const { addMenu, removeMenu, clearMenu } = ordersCounter.actions;

const store = configureStore({
  reducer: {
    orders: ordersCounter.reducer,
  },
});

export default store;
