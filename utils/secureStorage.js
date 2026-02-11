import AsyncStorage from "@react-native-async-storage/async-storage";

let SecureStore = null;
try {
  SecureStore = require("expo-secure-store");
} catch (_e) {
  SecureStore = null;
}

export async function secureSet(key, value) {  
  const raw = typeof value === "string" ? value : JSON.stringify(value);
  try {
    // Prefer SecureStore
    if (SecureStore && SecureStore.setItemAsync) {
      await SecureStore.setItemAsync(key, raw);
      return;
    }
  } catch (_err) {
    // fallback to AsyncStorage
    try {
      await AsyncStorage.setItem(key, raw);
    } catch (e) {
      console.warn("secureSet fallback failed", e);
    }
  }
}

export async function secureGet(key) {
  try {
    if (SecureStore && SecureStore.getItemAsync) {
      const v = await SecureStore.getItemAsync(key);
      if (v != null) return v;
    }
  } catch (_err) {
    // continue to fallback
  }

  try {
    const v = await AsyncStorage.getItem(key);
    return v;
  } catch (err) {
    console.warn("secureGet fallback failed", err);
    return null;
  }
}

export async function secureRemove(key) {
  try {
    if (SecureStore && SecureStore.deleteItemAsync) {
      await SecureStore.deleteItemAsync(key);
      return;
    }
  } catch (_err) {
    // fallback
  }

  try {
    await AsyncStorage.removeItem(key);
  } catch (_err) {
    console.warn("secureRemove fallback failed", _err);
  }
}
