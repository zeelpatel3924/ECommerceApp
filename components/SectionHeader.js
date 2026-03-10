import styles from "@/styles/homeStyles";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function SectionHeader({ title, category, type }) {
  const router = useRouter();

  const handleViewAll = useCallback(() => {
    router.push({
      pathname: "/products/view-all",
      params: {
        category: category || null,
        type: type || null,
      },
    });
  }, [router, category, type]);

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <TouchableOpacity onPress={handleViewAll}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Prevent unnecessary re-render if props don't change
export default React.memo(SectionHeader);
