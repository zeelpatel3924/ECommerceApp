/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/idStyles";
import { useCart } from "../../context/CartContext";
import BEST_SELLING from "../data/BestSelling";
import PRODUCTS from "../data/products";
import GROCERY_PROUDUCTS from "../data/Groceryproducts";
import CTALL_PRODUCTS from "../data/CTallproducts";
import { useWishlist } from "../../context/WishlistContext";


import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetails() {
  const { cart } = useCart();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const router = useRouter();
  const ALL_PRODUCTS = [
    ...PRODUCTS,
    ...CTALL_PRODUCTS,
    ...BEST_SELLING,
    ...GROCERY_PROUDUCTS,
  ];

  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();


  const product = React.useMemo(() =>
    ALL_PRODUCTS.find((p) => p.id === id, [id]),
  );

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#6b7f90", fontSize: 18 }}>
          Product not found
        </Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = React.useMemo(() => {
    return ALL_PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id,
    ).slice(0, 8); // limit items
  }, [product]);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.cartIcons}>
          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => router.push("/cart")}
          >
            <Ionicons name="cart-outline" size={22} color="#faf8f8ff" />

            {/* Cart Badge */}
            {cart.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  backgroundColor: "#456882",
                  borderRadius: 10,
                  minWidth: 18,
                  height: 18,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            contentFit="cover"
          />

          {/* Wishlist */}
          <TouchableOpacity
            style={styles.heart}
            onPress={() => {
              if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
          >
            <Ionicons
              name={isInWishlist(product.id) ? "heart" : "heart-outline"}
              size={26}
              color={isInWishlist(product.id) ? "#e63946" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#f5a623" />
          <Text style={styles.ratingText}>
            {product.rating || 4.5} • {product.reviews || 120} reviews
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {product.description || "High quality product with best materials."}
        </Text>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Related Products</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
            >
              {relatedProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.relatedCard}
                  onPress={() => router.push(`/product/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.relatedImage}
                    contentFit="cover"
                  />
                  <Text numberOfLines={1} style={styles.relatedName}>
                    {item.title}
                  </Text>
                  <Text style={styles.relatedPrice}>{item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Price */}
        <Text style={styles.price}> {product.price}</Text>

        {/* Stock */}
        <Text
          style={{
            color: product.stock < 5 ? "#e63946" : "#2a9d8f",
            fontWeight: "600",
          }}
        >
          {product.stock < 5 ? "Low stock" : "In stock"}
        </Text>

        {/* Quantity */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => qty > 1 && setQty(qty - 1)}
          >
            <Ionicons name="remove" size={22} color="#1B3C53" />
          </TouchableOpacity>

          <Text style={styles.qty}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(qty + 1)}
          >
            <Ionicons name="add" size={22} color="#1B3C53" />
          </TouchableOpacity>
        </View>

        {added && <Text style={styles.addedText}>✔ Added to cart</Text>}
      </ScrollView>

      {/* Sticky Bar */}
      <View style={styles.stickyBar}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
