import { Slot } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { initAuth } from "../src/store/authSlice";
import { setCart } from "../src/store/cartSlice";
import { store } from "../src/store/store";
import { setWishlist } from "../src/store/wishlistSlice";
import { cartKeyFor, safeGet, wishlistKeyFor } from "../utils/storage";

export default function RootLayout() {
  useEffect(() => {
    // initialize auth, then restore per-user cart & wishlist into Redux
    const init = async () => {
      await store.dispatch(initAuth());
      // initAuth may set auth.user in the store; read from state
      const user = store.getState().auth.user;

      try {
        const savedCart = (await safeGet(cartKeyFor(user))) || [];
        const savedWishlist = (await safeGet(wishlistKeyFor(user))) || [];

        store.dispatch(setCart(savedCart));
        store.dispatch(setWishlist(savedWishlist));
      } catch (err) {
        console.warn("Failed to restore persisted cart/wishlist", err);
      }
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
