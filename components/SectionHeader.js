import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import styles from "@/styles/homeStyles";

export default function SectionHeader({ title, category, type }) {
  const router = useRouter();
  const handleViewAll = () => {
    router.push({
      pathname: "/products/view-all",
      params: {
        category: category || null,
        type: type || null,
      },
    });
  };

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={handleViewAll}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}
