import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    quantity: '',
    size: '',
  },
  reducers: {
    addToCart(state, action) {},
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart } = actions;
export default reducer;
