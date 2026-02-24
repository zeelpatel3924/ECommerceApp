import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import BannerSlider from "../../components/BannerSlider";
import CategoryList from "../../components/CategoryList";
import Header from "../../components/Header";
import HorizontalProductList from "../../components/HorizontalProductList";
import ProductGrid from "../../components/ProductGrid";
import SearchBar from "../../components/SearchBar";

import styles from "../../styles/homeStyles";

import SectionHeader from "../../components/SectionHeader";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from "../../src/api/productsApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [bestSelling, setBestSelling] = useState([]);
  const [groceryProducts, setGroceryProducts] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [prodData, catData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);

      setProducts(prodData);
      setCategories([{ slug: "all", name: "All" }, ...catData]);

      // Best Selling (highest rating)
      const sortedByRating = [...prodData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

      setBestSelling(sortedByRating);

      //  Grocery Products
      const groceryData = await getProductsByCategory("groceries");
      setGroceryProducts(groceryData.slice(0, 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (slug) => {
    setSelectedCategory(slug);
    setLoading(true);

    try {
      if (slug === "all") {
        const data = await getAllProducts();
        setProducts(data);
      } else {
        const data = await getProductsByCategory(slug);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      />
    );
  }
  

  const banners = [
    "https://t4.ftcdn.net/jpg/17/91/88/69/240_F_1791886944_DDsG9lPlQ60vKCXcV5drarkEmVusITcm.jpg",
    "https://t3.ftcdn.net/jpg/05/26/53/52/240_F_526535232_3FG0tckX1I3yAaHqqBeCdt0MVE1A5UQ2.jpg",
    "https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Header />
      </View>

      {/* Vertical Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar />

        {/* CATEGORY FILTER */}
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <BannerSlider banners={banners} />

        <SectionHeader title="Suggested for you" />
        <ProductGrid products={products.slice(0, 4)} />

        <SectionHeader title="Best Selling" type="bestSelling" />
        <HorizontalProductList data={bestSelling} />

        <SectionHeader title="Grocery Products" category="groceries" />
        <HorizontalProductList data={groceryProducts} />

        <SectionHeader title="Top Products" type="topProducts" />
        <ProductGrid products={products} />
      </ScrollView>
    </View>
  );
}
