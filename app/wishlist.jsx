import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { useWishlist } from "../context/WishlistContext";
import { useRouter } from "expo-router";

export default function Wishlist() {
  const ctx = useWishlist() ?? { wishlist: [], removeFromWishlist: () => {} };
  const { wishlist: rawWishlist, removeFromWishlist } = ctx;
  const wishlist = Array.isArray(rawWishlist) ? rawWishlist : [];
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/account")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Wishlist</Text>

        <View style={{ width: 30 }} />
      </View>

      {/* ================= BODY ================= */}
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty!</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {wishlist.map((item) => (
            <Pressable
              key={item.id}
              style={styles.itemCard}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromWishlist(item.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#e63946" />
              </TouchableOpacity>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    backgroundColor: "#1B3C53",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    elevation: 4,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  container: {
    padding: 16,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B3C53",
  },

  price: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2a9d8f",
    marginTop: 4,
  },

  removeBtn: {
    padding: 6,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
