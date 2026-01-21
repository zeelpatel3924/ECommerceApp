import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import FormInput from "../components/FormInput";
import { registerUser } from "../src/store/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
  const { errors } = formState;
  const [generalError, setGeneralError] = useState("");

  const onSubmit = async (data) => {
    setGeneralError("");
    try {
      const result = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );
      if (result && result.payload) {
        reset();
        // redirect to login so user can sign in
        router.replace("/login");
      } else {
        setGeneralError("Could not create account");
      }
    } catch (err) {
      console.error("register error", err);
      setGeneralError("An unexpected error occurred.");
    }
  };

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    {/* Header */}
    <Text style={styles.brand}>ShopEase</Text>
    <Text style={styles.subtitle}>Create your account</Text>

    <Text style={styles.title}>Get Started 🚀</Text>

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
        />
      )}
    />

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
        />
      )}
    />

    <Controller
      control={control}
      name="password"
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
          placeholder="Create password"
          secureTextEntry
          error={errors.password?.message}
        />
      )}
    />

    {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
      <Text style={styles.buttonText}>Create Account</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/login")}>
      <Text style={styles.create}>Already have an account? Login</Text>
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

