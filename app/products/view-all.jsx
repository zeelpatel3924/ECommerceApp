/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import styles from "../../styles/viewAllStyles";

import ProductGrid from "../../components/ProductGrid";
import ViewAllHeader from "../../components/ViewAllHeader";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../src/api/productsApi";

const ViewAll = () => {
  const { category } = useLocalSearchParams();

  const cart = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let data;

      if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getAllProducts();
      }
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 2, marginTop:"8", backgroundColor :"" }}>
      {/* Fixed Header */}
      <ViewAllHeader
        title={category ? `${category} Products` : "All Products"}
        cart={cart}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No products found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewAll;
