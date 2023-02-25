import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  shippingFee: number;
}

const initialState = {
  shippingFee: 0,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingFee(state, action: PayloadAction<CheckoutState>) {
      const { shippingFee } = action.payload;
      state.shippingFee = shippingFee;
    },
  },
});

const { actions, reducer } = checkoutSlice;
export const { setShippingFee } = actions;
export default reducer;
