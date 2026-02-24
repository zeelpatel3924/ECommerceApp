
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { safeGet, safeRemove, safeSet, wishlistKeyFor } from "../utils/storage";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((s) => s.auth.user);
  const saveTimer = useRef(null);
  const mounted = useRef(true);

  // load wishlist for user or guest and merge guest on login
  useEffect(() => {
    mounted.current = true;

    const load = async () => {
      try {
        const guest = (await safeGet(wishlistKeyFor(null))) || [];
        const userList = (await safeGet(wishlistKeyFor(user))) || [];

        if (user) {
          // merge unique items
          const merged = mergeWishlist(userList, guest);
          setWishlist(merged);
          if (guest.length > 0) {
            await safeRemove(wishlistKeyFor(null));
            await safeSet(wishlistKeyFor(user), merged);
          }
        } else {
          setWishlist(guest);
        }
      } catch (err) {
        console.warn("Wishlist load error", err);
      }
    };

    load();

    return () => {
      mounted.current = false;
    };
  }, [user]);

  // save wishlist whenever it changes (debounced)
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        await safeSet(wishlistKeyFor(user), wishlist);
      } catch (err) {
        console.warn("Wishlist save error", err);
      }
    }, 300);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  function mergeWishlist(a = [], b = []) {
    const map = new Map();
    a.forEach((it) => map.set(it.id, it));
    b.forEach((it) => {
      if (!map.has(it.id)) map.set(it.id, it);
    });
    return Array.from(map.values());
  }

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
