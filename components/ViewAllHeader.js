import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CartBadge from "./CartBadge";

import styles from "../styles/viewAllStyles";

const ViewAllHeader = () => {
  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <CartBadge />
    </View>
  );
};

export default ViewAllHeader;
