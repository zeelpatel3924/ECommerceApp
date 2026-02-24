import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/homeStyles";

export default function CategoryList({ categories }) {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.slug} 
          style={styles.catBox}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/categories",
              params: { category: item.slug }, 
            })
          }
        >
          <Text style={styles.catText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
