import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart-slice';

const rootReducer = {
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
