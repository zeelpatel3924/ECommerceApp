/* eslint-disable react-hooks/exhaustive-deps */

import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartCount } from "../../src/store/cartSlice";

import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addToWishlist as reduxAddToWishlist,
  removeFromWishlist as reduxRemoveFromWishlist,
  selectWishlist,
} from "../../src/store/wishlistSlice";
import styles from "../../styles/idStyles";

import { useLocalSearchParams, useRouter } from "expo-router";

import {
  getProductById,
  getProductsByCategory,
} from "../../src/api/productsApi";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartCount);

  const { id, product: productParam } = useLocalSearchParams();

  const addToCartLocal = (p) => dispatch(addToCart(p));
  const router = useRouter();

  const [product, setProduct] = React.useState(
    productParam ? JSON.parse(productParam) : null,
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (product) return; // ✅ skip fetch if passed

    fetchProduct();
  }, [id]);
  const fetchProduct = async () => {
    try {
      setLoading(true); // ✅ move loading here
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const qty = 1;
  const [added, setAdded] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const screenWidth = Dimensions.get("window").width;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const wishlist = useSelector(selectWishlist);
  const isInWishlist = (id) => wishlist.some((it) => it.id === id);
  const addToWishlist = (p) => dispatch(reduxAddToWishlist(p));
  const removeFromWishlist = (id) => dispatch(reduxRemoveFromWishlist(id));
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  React.useEffect(() => {
    if (product?.category) {
      fetchRelatedProducts();
    }
  }, [product]);
  const fetchRelatedProducts = async () => {
    try {
      const data = await getProductsByCategory(product.category);

      const filtered = data
        .filter((item) => item.id !== product.id)
        .slice(0, 8);

      setRelatedProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
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

    addToCartLocal({ ...product, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
            {totalItems > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  backgroundColor: "#f70d0dff",
                  borderRadius: 10,
                  minWidth: 18,
                  height: 18,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}
                >
                  {totalItems}
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
            {images.map((src, i) => (
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
            {images.map((src, i) => (
              <View
                key={i}
                style={[styles.dot, activeIndex === i && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.titleRow}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Feather name="star" size={18} color="#f5a623" />
            <Text style={styles.ratingText}>
              {product.rating || product.review || "4.5"}
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Stock */}
        <Text
          style={{
            color: product.stock && product.stock < 5 ? "#e63946" : "#2a9d8f",
            marginLeft: 14,
            fontWeight: "600",
          }}
        >
          {product.stock
            ? product.stock < 5
              ? "Low stock"
              : "In stock"
            : "Available"}
        </Text>

        <Text style={styles.price}>${product.price}</Text>

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
                  onPress={() =>
                    router.push({
                      pathname: `/product/${item.id}`,
                      params: { product: JSON.stringify(item) },
                    })
                  }
                >
                  <Image
                    source={{
                      uri: item.images?.[0] || item.thumbnail || item.image,
                    }}
                    style={styles.relatedImage}
                    contentFit="cover"
                  />

                  <Text numberOfLines={1} style={styles.relatedName}>
                    {item.title}
                  </Text>
                  <Text style={styles.relatedPrice}>${item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bar */}
      {/* Sticky Bar */}
      <View style={styles.stickyBar}>
        {/* LEFT — View Cart */}
        <TouchableOpacity
          style={styles.viewCartBtn}
          onPress={() => router.push("/cart")}
          activeOpacity={0.9}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.viewCartText}>View Cart</Text>

          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* RIGHT — Add To Cart */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={handleAddToCart}
          activeOpacity={0.9}
        >
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
