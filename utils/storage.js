import AsyncStorage from "@react-native-async-storage/async-storage";

// Utilities for per-user storage keys and safe JSON parsing
export const cartKeyFor = (user) => {
  if (!user) return "cart:guest";
  return `cart:${user.id ?? user.email ?? "unknown"}`; 
};

export const wishlistKeyFor = (user) => {
  if (!user) return "wishlist:guest"; 
  return `wishlist:${user.id ?? user.email ?? "unknown"}`;
};

export async function safeGet(key) {
  try {
    const raw = await AsyncStorage.getItem(key); 
    return raw ? JSON.parse(raw) : null; 
  } catch (err) {
    console.warn("safeGet parse error for key", key, err); 
    return null;
  }
}

export async function safeSet(key, value) {
  //set item in asyn storage
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); 
  } catch (err) {
    //
    console.warn("safeSet error for key", key, err); 
  }
}

export async function safeRemove(key) {
  //
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn("safeRemove error for key", key, err);
  }
}
