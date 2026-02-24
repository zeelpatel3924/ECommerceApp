import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
} from "../../src/store/cartSlice";
import styles from "../../styles/cartStyles";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const router = useRouter();

  // totoal calculation
  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * item.qty;
  }, 0);

  // remove confirm
  const handleRemove = (id) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => dispatch(removeFromCart(id)),
      },
    ]);
  };

  // Checkout handler
  const handleCheckout = () => {
    Alert.alert(
      "Order Successful 🎉",
      "Your order has been placed successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            dispatch(clearCart());
            router.replace("/home");
          },
        },
      ],
    );
  };

  // render Item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cartItem}
      activeOpacity={0.85}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image
        source={{ uri: item.images?.[0] || item.thumbnail || item.image }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>

        {/* Quantity Row */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              dispatch(decreaseQty(item.id));
            }}
            style={styles.qtyBtn}
          >
            <Ionicons name="remove" size={16} />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              dispatch(increaseQty(item.id));
            }}
            style={styles.qtyBtn}
          >
            <Ionicons name="add" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      {/*Delete Button*/}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          handleRemove(item.id);
        }}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity onPress={() => router.push("/wishlist")}>
          <Feather name="heart" size={26} color="red" />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Ionicons name="cart-outline" size={70} color="#ccc" />
            <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
          </View>
        }
        renderItem={renderItem}
      />

      {/*Bottom Summary*/}
      {cart.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>${totalAmount}</Text>
          </View>

          {/*Checkout Button*/}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={handleCheckout}
            activeOpacity={0.8}
          >
            <Text style={styles.checkoutText}>
              Proceed to Checkout ({cart.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
