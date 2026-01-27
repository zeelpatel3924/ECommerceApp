/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import FormInput from "../components/FormInput";
import { registerUser } from "../src/store/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
  const { errors } = formState;

  // Animations
  const containerAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const onSubmit = async (data) => {
    setGeneralError("");
    setLoading(true);

    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.96, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }),
    ]).start();

    try {
      const result = await dispatch(registerUser(data));

      if (result?.payload) {
        reset();
        router.replace("/login");
      } else {
        triggerError("Could not create account");
      }
    } catch (err) {
      triggerError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerError = (msg) => {
    setGeneralError(msg);

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 12, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -12, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const translateY = containerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const opacity = containerAnim;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={["#667eea", "#764ba2", "#4facfe"]}
        style={styles.background}
      />

      {/* Center Container */}
      <View style={styles.centerContainer}>
        {/* Glass Card */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity,
              transform: [{ translateY }, { translateX: shakeAnim }],
            },
          ]}
        >
          <Text style={styles.brand}>ShopEase</Text>
          <Text style={styles.subtitle}>Create your account</Text>

          {/* Name */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Full Name"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="John Doe"
                error={errors.name?.message}
                floatingLabel
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="you@example.com"
                keyboardType="email-address"
                error={errors.email?.message}
                floatingLabel
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Password"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Create password"
                secureTextEntry
                error={errors.password?.message}
                floatingLabel
              />
            )}
          />

          {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

          {/* Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[styles.button, loading && styles.buttonDisabled]}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.create}>Already have an account? Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    padding: 28,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 20 },
    elevation: 20,
  },

  brand: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 32,
  },

  button: {
    backgroundColor: "#4facfe",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#4facfe",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  create: {
    marginTop: 26,
    textAlign: "center",
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
  },

  error: {
    color: "#FF6B6B",
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "rgba(255,107,107,0.15)",
    padding: 10,
    borderRadius: 12,
  },
});
