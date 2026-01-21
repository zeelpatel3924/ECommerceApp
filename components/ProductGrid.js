/* eslint-disable no-unused-expressions */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/homeStyles";
import { useWishlist } from "../context/WishlistContext";

export default function ProductGrid({ products }) {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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
              onPress={() => {
                liked ? removeFromWishlist(item.id) : addToWishlist(item);
              }}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={16}
                color="#fff"
              />
            </TouchableOpacity>

            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>

            <View style={styles.bottomRow}>
              <Text style={styles.viewText}>View More</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
