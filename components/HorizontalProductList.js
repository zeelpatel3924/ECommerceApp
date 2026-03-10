import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/homeStyles";

function HorizontalProductList({ data = [] }) {
  const router = useRouter();

  // ✅ Memoized navigation
  const handleNavigate = useCallback(
    (id) => {
      router.push(`/product/${id}`);
    },
    [router]
  );

  // ✅ Render each product
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.Grocerycard}
        activeOpacity={0.85}
        onPress={() => handleNavigate(item.id)}
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
            <Text style={{ marginLeft: 4, fontSize: 12 }}>
              {item.rating}
            </Text>
          </View>
        )}

        {/* Price */}
        <Text style={styles.GroceryPrice}>${item.price}</Text>
      </TouchableOpacity>
    ),
    [handleNavigate]
  );

  const keyExtractor = useCallback(
    (item) => item.id.toString(),
    []
  );

  if (!data.length) return null;

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews
    />
  );
}

export default React.memo(HorizontalProductList);