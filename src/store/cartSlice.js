import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload || [];
    },

    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.qty = (existing.qty || 0) + (item.qty || 1);
      } else {
        state.items.push({ ...item, qty: item.qty || 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    increaseQty(state, action) {
      const id = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.qty = (it.qty || 0) + 1;
    },

    decreaseQty(state, action) {
      const id = action.payload;
      state.items = state.items
        .map((i) => (i.id === id ? { ...i, qty: (i.qty || 0) - 1 } : i))
        .filter((i) => i.qty > 0);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items || [];
export const selectCartCount = (state) =>
  (state.cart.items || []).reduce((s, it) => s + (it.qty || 0), 0);

export default cartSlice.reducer;
