import { Slot } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { initAuth } from "../src/store/authSlice";
import { store } from "../src/store/store";

export default function RootLayout() {
  // initialize auth from storage into Redux. Do NOT block rendering here
  // so that route-level screens (like /splash) can mount and perform
  // their own redirect logic. The Splash screen handles navigation based
  // on session state.
  useEffect(() => {
    store.dispatch(initAuth());
  }, []);

  return (
    <Provider store={store}>
      <CartProvider>
        <WishlistProvider>
          <Slot />
        </WishlistProvider>
      </CartProvider>
    </Provider>
  );
}
