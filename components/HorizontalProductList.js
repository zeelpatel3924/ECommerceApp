import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/homeStyles";

export default function HorizontalProductList({ data = [] }) {
  const router = useRouter();

  if (!data.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {data.map((item) => (
        <TouchableOpacity
          key={item.id?.toString()}
          style={styles.Grocerycard}
          activeOpacity={0.85}
          onPress={() => router.push(`/product/${item.id}`)}
        >
          {/* Product Image */}
          <Image
            source={{
              uri: item.images?.[0] || item.thumbnail || item.image,
            }}
            style={styles.GroceryImage}
            contentFit="cover"
            transition={200}
          />

          {/* Product Title */}
          <Text numberOfLines={1} style={styles.GroceryTitle}>
            {item.title}
          </Text>

          {/* Rating */}
          {item.rating && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="star" size={14} color="#f5a623" />
              <Text style={{ marginLeft: 4, fontSize: 12 }}>{item.rating}</Text>
            </View>
          )}

          {/* Price */}
          <Text style={styles.GroceryPrice}>${item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
