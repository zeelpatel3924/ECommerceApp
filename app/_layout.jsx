import { Slot } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { initAuth } from "../src/store/authSlice";
import { store } from "../src/store/store";

export default function RootLayout() {
 
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
