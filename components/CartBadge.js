// components/CartBadge.js
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectCartCount } from "../src/store/cartSlice";

export default function CartBadge({ iconSize = 22, color = "#0a0a0aff" }) {
  const total = useSelector(selectCartCount);
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      style={{ position: "relative" }}
    >
      <Ionicons name="cart-outline" size={iconSize} color={color} />
      {total > 0 && (
        <View style={styles.badge}>
          <Text style={styles.count}>{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#456882",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  count: { color: "#f0eeeeff", fontSize: 11, fontWeight: "700" },
});
