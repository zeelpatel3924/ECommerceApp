import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../components/FormInput";
import { loginUser } from "../src/store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.auth.loading);

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { errors } = formState;
  const [generalError, setGeneralError] = useState("");

  const onSubmit = async (data) => {
    setGeneralError("");
    try {
      const result = await dispatch(
        loginUser({ email: data.email, password: data.password }),
      );
      if (result && result.payload) {
        reset();
        router.replace("/(tabs)/home");
      } else {
        setGeneralError("Invalid credentials");
      }
    } catch (err) {
      setGeneralError("An unexpected error occurred.");
      console.error("login error", err);
    }
  };

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    {/* Header */}
    <Text style={styles.brand}>ShopEase</Text>
    <Text style={styles.subtitle}>Log in to continue shopping</Text>

    {/* Login Card */}
    <Text style={styles.title}>Welcome Back 👋</Text>

    <Controller
      control={control}
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
        />
      )}
      name="email"
    />

    <Controller
      control={control}
      rules={{
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormInput
          label="Password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Your password"
          secureTextEntry
          error={errors.password?.message}
        />
      )}
      name="password"
    />

    {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

    <TouchableOpacity
      onPress={handleSubmit(onSubmit)}
      style={[styles.button, loading && styles.buttonDisabled]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>Log In</Text>
      )}
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/register")}>
      <Text style={styles.create}>New user? Create account</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4FF",
    justifyContent: "center",
    padding: 26,
  },

  brand: {
    fontSize: 36,
    fontWeight: "900",
    color: "#3F37FF",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 6,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "#777",
    marginBottom: 36,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 22,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E4E8F3",
    padding: 15,
    borderRadius: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#3F37FF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 14,
    shadowColor: "#3F37FF",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  create: {
    marginTop: 28,
    textAlign: "center",
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },

  error: {
    color: "#FF3B30",
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center",
  },
});
