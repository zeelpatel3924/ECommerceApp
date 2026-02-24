/* eslint-disable no-unused-expressions */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist as reduxAddToWishlist,
  removeFromWishlist as reduxRemoveFromWishlist,
  selectWishlist,
} from "../src/store/wishlistSlice";
import styles from "../styles/homeStyles";

export default function ProductGrid({ products = [] }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const isInWishlist = (id) => wishlist.some((it) => it.id === id);
  const toggleWishlist = (item) => {
    isInWishlist(item.id)
      ? dispatch(reduxRemoveFromWishlist(item.id))
      : dispatch(reduxAddToWishlist(item));
  };
  return (
    <View style={styles.grid}>
      {products.map((item) => {
        const liked = isInWishlist(item.id);

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push(`/product/${item.id}`)}
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
            {/* Title */}
            <Text numberOfLines={1} style={styles.productTitle}>
              {item.title}
            </Text>
            {/* Rating */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={14} color="#f4a261" />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>{item.rating}</Text>
            </View>

            {/* Bottom Row */}
            <View style={styles.bottomRow}>
              <View style={styles.viewBtn}>
                <Text style={styles.viewText}>View</Text>
              </View>

              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
