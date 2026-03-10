import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CartBadge from "../../components/CartBadge";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from "../../src/api/productsApi";
import styles from "../../styles/categoriesStyles";

export default function Categories() {
  const { category } = useLocalSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  //Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [catData, prodData] = await Promise.all([
        getCategories(),
        getAllProducts(),
      ]);

      setCategories([{ slug: "all", name: "All" }, ...catData]);
      setProducts(prodData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //handle url category param
  useEffect(() => {
    if (typeof category === "string") {
      setSelectedCategory(category);
      handleCategorySelect(category);
    }
  }, [category]);

  // 🔥 Category Select
  const handleCategorySelect = async (slug) => {
    setSelectedCategory(slug);
    setLoading(true);

    try {
      let data;

      if (slug === "all") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategory(slug);
      }

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Search Filter (local filter after API fetch)
  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [products, searchText]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#6b7f90" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products..."
            placeholderTextColor="#9aa7b2"
            style={styles.searchInput}
          />
        </View>

        <CartBadge color="#fff" />
      </View>

      {/* ================= BODY ================= */}

      <View style={styles.body}>
        {/* LEFT SIDEBAR */}
        <View
          style={[
            styles.categoryContainer,
            !sidebarOpen && styles.categoryClosed,
          ]}
        >
          {sidebarOpen && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.slug}
                  onPress={() => handleCategorySelect(item.slug)}
                  style={[
                    styles.categoryItem,
                    selectedCategory === item.slug && styles.activeCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item.slug &&
                        styles.activeCategoryText,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => setSidebarOpen(!sidebarOpen)}
          >
            <Ionicons
              name={sidebarOpen ? "chevron-back" : "chevron-forward"}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* RIGHT PRODUCTS */}
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
                    source={{ uri: item.images?.[0] || item.thumbnail }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
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
