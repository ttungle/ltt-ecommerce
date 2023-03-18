import { ProductAttributeData } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: Array<CartItemState>;
}

export interface CartItemState {
  id: number;
  quantity: number;
  size: string;
  product: ProductAttributeData;
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemState>) {
      const newItem: CartItemState = action.payload;

      const index = state.cartItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action: PayloadAction<CartItemState>) {
      const { id, quantity, size } = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === id && item.size === size);

      state.cartItems[index].quantity = quantity;
    },
    removeFromCart(state, action: PayloadAction<CartItemState>) {
      const { id, size } = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === id && item.size === size);
      state.cartItems.splice(index, 1);
    },
    setEmptyCart(state) {
      state.cartItems = [];
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, setQuantity, removeFromCart, setEmptyCart } = actions;
export default reducer;
