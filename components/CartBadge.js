// components/CartBadge.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectCartCount } from "../src/store/cartSlice";

function CartBadge({ iconSize = 22, color = "#0a0a0aff" }) {
  const total = useSelector(selectCartCount);
  const router = useRouter();

 
  const handlePress = useCallback(() => {
    router.push("/cart");
  }, [router]);


  const badge = useMemo(() => {
    if (total <= 0) return null;

    return (
      <View style={styles.badge}>
        <Text style={styles.count}>{total}</Text>
      </View>
    );
  }, [total]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Ionicons name="cart-outline" size={iconSize} color={color} />
      {badge}
    </TouchableOpacity>
  );
}

export default React.memo(CartBadge);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f80909ff",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  count: {
    color: "#fcfafaff",
    fontSize: 11,
    fontWeight: "700",
  },
});