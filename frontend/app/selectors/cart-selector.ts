import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const cartItemSelector = (state: RootState) => state.cart.cartItems;

export const cartItemCountSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const cartTotalSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity * (item?.product?.salePrice ?? 0), 0)
);
