 
 
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist as reduxAddToWishlist,
  removeFromWishlist as reduxRemoveFromWishlist,
  selectWishlist,
} from "../src/store/wishlistSlice";
import styles from "../styles/homeStyles";

function ProductGrid({ products = [] }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);

  // ✅ Convert wishlist to Set for O(1) lookup instead of .some()
  const wishlistSet = useMemo(() => {
    return new Set(wishlist.map((item) => item.id));
  }, [wishlist]);

  // ✅ Memoized navigation
  const handleNavigate = useCallback(
    (id) => {
      router.push(`/product/${id}`);
    },
    [router],
  );

  // ✅ Memoized wishlist toggle
  const toggleWishlist = useCallback(
    (item) => {
      if (wishlistSet.has(item.id)) {
        dispatch(reduxRemoveFromWishlist(item.id));
      } else {
        dispatch(reduxAddToWishlist(item));
      }
    },
    [dispatch, wishlistSet],
  );

  // ✅ Memoized product rendering
  const renderedProducts = useMemo(() => {
    return products.map((item) => {
      const liked = wishlistSet.has(item.id);

      return (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleNavigate(item.id)}
        >
          {/* Like Button */}
          <TouchableOpacity
            style={styles.likeIcon}
            onPress={() => toggleWishlist(item)}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? "#e63946" : "#0a0a0aff"}
            />
          </TouchableOpacity>

          <Image
            source={{
              uri:
                item.thumbnail ||
                item.images?.[0] ||
                "https://via.placeholder.com/150",
            }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={14} color="#f4a261" />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>{item.rating}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.viewBtn}>
              <Text style={styles.viewText}>View</Text>
            </View>

            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }, [products, wishlistSet, handleNavigate, toggleWishlist]);

  return <View style={styles.grid}>{renderedProducts}</View>;
}

export default React.memo(ProductGrid);
