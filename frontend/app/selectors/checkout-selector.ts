import { RootState } from '../store';

export const shippingFeeSelector = (state: RootState) => state.checkout.shippingFee;
