import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles/viewAllStyles";
import CartBadge from "./CartBadge";

function ViewAllHeader() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <CartBadge />
    </View>
  );
}

export default React.memo(ViewAllHeader);
