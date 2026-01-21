import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // load wishlist from storage
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("wishlist");
        if (raw && mounted) setWishlist(JSON.parse(raw));
      } catch (_e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // save wishlist whenever it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (_e) {
        // ignore
      }
    })();
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
