import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/homeStyles";

export default function HorizontalProductList({ data }) {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.Grocerycard}
          onPress={() => router.push(`/product/${item.id}`)}
        >
          <Image source={{ uri: item.image }} style={styles.GroceryImage} />
          <Text numberOfLines={1} style={styles.GroceryTitle}>
            {item.title}
          </Text>
          <Text style={styles.GroceryPrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
