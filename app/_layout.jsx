import { Slot } from "expo-router";
import { WishlistProvider } from "../context/WishlistContext";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Slot />
      </WishlistProvider>
    </CartProvider>
  );
}
