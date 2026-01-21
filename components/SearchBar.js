import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "../styles/homeStyles";

export default function SearchBar() {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/categories")}
      style={styles.searchBox}
    >
      <Ionicons name="search-outline" size={25} color="#6b7f90" />
      <Text style={styles.searchText}>Search by product or category</Text>
    </TouchableOpacity>
  );
}
