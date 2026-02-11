/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */

import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";

import { useCart } from "../../context/CartContext";

import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWishlist } from "../../context/WishlistContext";
import styles from "../../styles/idStyles";
import BEST_SELLING from "../data/BestSelling";
import CTALL_PRODUCTS from "../data/CTallproducts";
import GROCERY_PROUDUCTS from "../data/Groceryproducts";
import PRODUCTS from "../data/products";

import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductDetails() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const screenWidth = Dimensions.get("window").width;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();

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
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

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
        {/* Image Carousel */}
        <View style={styles.imageWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(
                e.nativeEvent.contentOffset.x / screenWidth,
              );
              setActiveIndex(idx);
            }}
          >
            {(product.images || [product.image]).map((src, i) => (
              <Animated.View
                key={i}
                style={{
                  width: screenWidth,
                  transform: [{ scale: scaleAnim }],
                }}
              >
                <Image
                  source={{ uri: src }}
                  style={styles.image}
                  contentFit="cover"
                />
              </Animated.View>
            ))}
          </ScrollView>

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

          {/* Dots */}
          <View style={styles.dotsContainer} pointerEvents="none">
            {(product.images || [product.image]).map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeIndex === i && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.titleRow}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Feather name="star" size={18} color="#f5a623" />
            <Text style={styles.ratingText}>
              {product.review} ({product.rating})
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Stock */}
        <Text
          style={{
            color: product.stock < 5 ? "#e63946" : "#2a9d8f",
            marginLeft: 14,
            fontWeight: "600",
          }}
        >
          {product.stock < 5 ? "Low stock" : "In stock"}
        </Text>

        <View style={styles.priceQtyRow}>
          {/* Price */}
          <Text style={styles.price}> {product.price}</Text>

          {/* Quantity */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => qty > 1 && setQty(qty - 1)}
            >
              <Ionicons name="remove" size={18} color="#1B3C53" />
            </TouchableOpacity>

            <Text style={styles.qty}>{qty}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Ionicons name="add" size={18} color="#1B3C53" />
            </TouchableOpacity>
          </View>
        </View>

        {added && <Text style={styles.addedText}> Added to cart</Text>}

        {/* ================= RELATED PRODUCTS ================== */}
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
      </ScrollView>

      {/* Sticky Bar */}
      <View style={styles.stickyBar}>
        {/* Left Cart Icon */}
        <TouchableOpacity
          style={styles.cartIconBtn}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={27} color="#0F172A" />

          {/* Cart Badge */}
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* View Cart Button */}
        <TouchableOpacity
          style={styles.ViewBtn}
          onPress={() => router.push("/cart")}
          activeOpacity={0.9}
        >
          <Text style={styles.ViewBtnText}>View cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
