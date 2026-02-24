import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.items = action.payload || [];
    },

    addToWishlist(state, action) {
      const item = action.payload;
      if (!state.items.find((i) => i.id === item.id)) {
        state.items.push(item);
      }
    },

    removeFromWishlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.items || [];

export default wishlistSlice.reducer;
