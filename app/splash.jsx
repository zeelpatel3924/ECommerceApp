/* eslint-disable react-hooks/exhaustive-deps */

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { initAuth } from "../src/store/authSlice";
import { store } from "../src/store/store";
import { getUserSession } from "../utils/auth";

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Logo + text animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textTranslate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const init = async () => {
      const start = Date.now();
      store.dispatch(initAuth());

      let session = null;
      try {
        session = await getUserSession();
      } catch (_e) {}

      const elapsed = Date.now() - start;
      if (elapsed < 3000) {
        await new Promise((r) => setTimeout(r, 3000 - elapsed));
      }

      router.replace(session ? "/(tabs)/home" : "/login");
    };

    init();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-10deg", "0deg"],
  });

  return (
    <LinearGradient
      colors={["#2874F0", "#1A4B7A"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate }],
          },
        ]}
      >
        <Image
          source={require("../assets/images/splash-icon1.png")}
          style={styles.logo}
        />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: textTranslate }],
          opacity: fadeAnim,
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>E-Commerce</Text>
        <Text style={styles.subtitle}>Shop Smart. Shop Fast.</Text>
      </Animated.View>

      <ActivityIndicator size="large" color="#fff" style={styles.indicator} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    marginBottom: 30,
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    borderRadius:8,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#E3ECFF",
    letterSpacing: 0.6,
  },

  indicator: {
    marginTop: 25,
  },
});
