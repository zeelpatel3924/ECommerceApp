import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/homeStyles";

export default function CategoryList({ categories }) {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.catBox}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/categories",
              params: { category: item.name },
            })
          }
        >
          <Image source={item.image} style={styles.catImage} />
          <Text style={styles.catText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
