import React, { useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectCartCount } from "../src/store/cartSlice";
import styles from "../styles/homeStyles";

function Header() {
  const router = useRouter();
  const totalItems = useSelector(selectCartCount);

  // ✅ Memoized navigation
  const handleCartPress = useCallback(() => {
    router.push("/cart");
  }, [router]);

  // ✅ Memoized badge rendering
  const cartBadge = useMemo(() => {
    if (totalItems <= 0) return null;

    return (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{totalItems}</Text>
      </View>
    );
  }, [totalItems]);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.subText}>Location</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#1B1B1B" />
          <Text style={styles.locationText}> VALSAD (IND)</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleCartPress}>
        <Ionicons name="cart-outline" size={22} color="#000" />
        {cartBadge}
      </TouchableOpacity>
    </View>
  );
}

// ✅ Prevent unnecessary re-renders from parent
export default React.memo(Header);