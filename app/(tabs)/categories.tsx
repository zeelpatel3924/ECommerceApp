/* eslint-disable import/no-named-as-default */

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CartBadge from "../../components/CartBadge";
import styles from "../../styles/categoriesStyles";
import Bestselling from "../data/BestSelling";
import CTALL_PRODUCTS from "../data/CTallproducts";
import GROCERY_PRODUCTS from "../data/Groceryproducts";
import PRODUCTS from "../data/products";

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Mobiles",
  "Grocery",
  "Beauty",
  "Home",
  "Appliances",
  "Toys",
  "Sports",
  "Automotive",
  "Books",
  "Music",
  "Health",
  "Jewelry",
  "Furniture",
  "Garden",
];

const products = [
  ...PRODUCTS,
  ...CTALL_PRODUCTS,
  ...Bestselling,
  ...GROCERY_PRODUCTS,
];

export default function Categories() {
  const { category: initialCategory } = useLocalSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory as string);
    }
  }, [initialCategory]);

  /*  FINAL FILTER LOGIC */
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory =
        selectedCategory === "All" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch =
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchText]);

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          {/* SEARCH */}
          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              marginLeft={12}
              size={25}
              color="#6b7f90"
            />

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search by product or category"
              placeholderTextColor="#9aa7b2"
              style={styles.searchInput}
            />
          </View>

          {/* CART */}
          <CartBadge color="#ffff" />
        </View>
      </View>

      {/* ================= BODY ================= */}
      <View style={styles.body}>
        {/* ===== LEFT CATEGORY SIDEBAR ===== */}
        <View
          style={[
            styles.categoryContainer,
            !sidebarOpen && styles.categoryClosed,
          ]}
        >
          {sidebarOpen && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategory(item)}
                  style={[
                    styles.categoryItem,
                    selectedCategory === item && styles.activeCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item && styles.activeCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* PIN BUTTON */}
          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => setSidebarOpen(!sidebarOpen)}
          >
            <Ionicons
              name={sidebarOpen ? "chevron-back" : "chevron-forward"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* ===== RIGHT PRODUCTS ===== */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.verticalGrid}
          style={styles.productContainer}
        >
          <View style={styles.gridContainer}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridCard}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No products found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
