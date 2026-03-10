import React, { useMemo, useCallback } from "react";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/homeStyles";

function CategoryList({ categories = [] }) {
  const router = useRouter();


  const handleNavigate = useCallback(
    (slug) => {
      router.push({
        pathname: "/(tabs)/categories",
        params: { category: slug },
      });
    },
    [router]
  );

  
  const renderedCategories = useMemo(() => {
    return categories.map((item) => (
      <TouchableOpacity
        key={item.slug}
        style={styles.catBox}
        onPress={() => handleNavigate(item.slug)}
      >
        <Text style={styles.catText}>{item.name}</Text>
      </TouchableOpacity>
    ));
  }, [categories, handleNavigate]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderedCategories}
    </ScrollView>
  );
}


export default React.memo(CategoryList);