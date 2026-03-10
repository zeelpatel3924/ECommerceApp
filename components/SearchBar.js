import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/homeStyles";

function SearchBar() {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push("/categories");
  }, [router]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.searchBox}
    >
      <Ionicons name="search-outline" size={25} color="#6b7f90" />
      <Text style={styles.searchText}>Search by product or category</Text>
    </TouchableOpacity>
  );
}

export default React.memo(SearchBar);
