import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cart-slice';
import checkoutReducer from './slices/checkout-slice';
import globalReducer from './slices/global-slice';

const rootReducer = {
  cart: cartReducer,
  checkout: checkoutReducer,
  global: globalReducer,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const combinedReducers = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
