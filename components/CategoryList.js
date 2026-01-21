import { ScrollView, View, Image, Text } from "react-native";
import styles from "../styles/homeStyles";

export default function CategoryList({ categories }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((item) => (
        <View key={item.id} style={styles.catBox}>
          <Image source={item.image} style={styles.catImage} />
          <Text style={styles.catText}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
