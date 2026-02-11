import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /* ================= LOAD CART ================= */
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log("Error loading cart", error);
    }
  };

  /* ================= SAVE CART ================= */
  const saveCart = async (updatedCart) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log("Error saving cart", error);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + product.qty, // 
              }
            : item

        );
      } else {
        updatedCart = [...prevCart, { ...product }];
      }

      saveCart(updatedCart);
      return updatedCart;
    });
  };

  /* ================= REMOVE ITEM ================= */
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  /* ================= CLEAR CART ================= */
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.log("Error clearing cart", error);
    }
  };

  /* ================= TOTALS ================= */
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useCart = () => useContext(CartContext);
