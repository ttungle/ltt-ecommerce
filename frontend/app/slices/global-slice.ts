import { createSlice } from '@reduxjs/toolkit';

export interface CheckoutState {
  showFavoritePopover: boolean;
  showMiniCart: boolean;
}

const initialState = {
  showFavoritePopover: false,
  showMiniCart: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
      if (state.showFavoritePopover) state.showFavoritePopover = false;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    showFavoritePopover(state) {
      state.showFavoritePopover = true;
      if (state.showMiniCart) state.showMiniCart = false;
    },
    hideFavoritePopover(state) {
      state.showFavoritePopover = false;
    },
  },
});

const { actions, reducer } = globalSlice;
export const { showMiniCart, hideMiniCart, showFavoritePopover, hideFavoritePopover } = actions;
export default reducer;
