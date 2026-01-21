import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import styles from "../../styles/cartStyles";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + parseInt(item.price.replace(/[₹,]/g, "")) * item.qty,
    0
  );

  // Checkout handler
  const handleCheckout = () => {
    Alert.alert(
      "Order Successful 🎉",
      "Your order has been placed successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart(); // clear cart after order
            router.push("/home");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cartItem}
            activeOpacity={0.85}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>

              {/* Quantity Row */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    decreaseQty(item.id);
                  }}
                  style={styles.qtyBtn}
                >
                  <Ionicons name="remove" size={16} />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.qty}</Text>

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    increaseQty(item.id);
                  }}
                  style={styles.qtyBtn}
                >
                  <Ionicons name="add" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                removeFromCart(item.id);
              }}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Summary */}
      {cart.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
