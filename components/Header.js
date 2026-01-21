import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import styles from "../styles/homeStyles";

export default function Header() {
  const router = useRouter();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.subText}>Location</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#1B1B1B" />
          <Text style={styles.locationText}> Mumbai (IND)</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push("/cart")}>
        <Ionicons name="cart-outline" size={22} color="#000" />

        {totalItems > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
