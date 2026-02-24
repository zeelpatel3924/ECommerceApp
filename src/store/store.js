import { configureStore } from "@reduxjs/toolkit";
import { cartKeyFor, safeSet, wishlistKeyFor } from "../../utils/storage";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

// Persist cart & wishlist per-user on changes (debounced)
let persistTimer = null;
store.subscribe(() => {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(async () => {
    try {
      const state = store.getState();
      const user = state.auth.user;
      const cart = state.cart.items || [];
      const wishlist = state.wishlist.items || [];

      await safeSet(cartKeyFor(user), cart);
      await safeSet(wishlistKeyFor(user), wishlist);
    } catch (err) {
      console.warn("store persist error", err);
    }
  }, 300);
});

export default store;
