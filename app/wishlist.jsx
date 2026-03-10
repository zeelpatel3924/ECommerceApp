import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../src/store/cartSlice";
import {
  removeFromWishlist as reduxRemoveFromWishlist,
  selectWishlist,
} from "../src/store/wishlistSlice";

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist) ?? [];
  const router = useRouter();
  const { from } = useLocalSearchParams();

  /* ================= REMOVE CONFIRM ================= */
  const handleRemove = (id) => {
    Alert.alert("Remove Item", "Remove this item from wishlist?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => dispatch(reduxRemoveFromWishlist(id)),
      },
    ]);
  };

  /* ================= MOVE TO CART ================= */
  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(reduxRemoveFromWishlist(item.id));
  };

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image
        source={{ uri: item.images?.[0] || item.thumbnail || item.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={(e) => {
              e.stopPropagation();
              handleMoveToCart(item);
            }}
          >
            <Ionicons name="cart-outline" size={16} color="#fff" />
            <Text style={styles.cartBtnText}>Move to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={(e) => {
          e.stopPropagation();
          handleRemove(item.id);
        }}
      >
        <Ionicons name="trash-outline" size={20} color="#e63946" />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (from === "cart") {
              router.replace("/cart");
            } else if (from === "account") {
              router.replace("/account");
            } else {
              router.back();
            }
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Wishlist</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ================= BODY ================= */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={70} color="#ccc" />
            <Text style={styles.emptyText}>Your wishlist is empty</Text>
            <TouchableOpacity
              style={styles.shopBtn}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    paddingTop: 60,
    backgroundColor: "#052659",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    elevation: 4,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    elevation: 3,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1B3C53",
  },

  price: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2a9d8f",
    marginTop: 6,
  },

  actionRow: {
    marginTop: 8,
  },

  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#211fc6ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  cartBtnText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
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
    marginTop: 10,
    marginBottom: 16,
  },

  shopBtn: {
    backgroundColor: "#1B3C53",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  shopBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
