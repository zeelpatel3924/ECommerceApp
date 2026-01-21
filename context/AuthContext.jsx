import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");
        if (token && savedUser) setUser(JSON.parse(savedUser));
      } catch {
        // ignore
      } finally {
        setReady(true);
      }
    };

    checkAuth();
  }, []);

  const signup = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    await AsyncStorage.setItem("token", "demo-token");
    setUser(data);
  };

  const login = async (data) => {
    const saved = await AsyncStorage.getItem("user");
    if (!saved) {
      alert("No account found. Please signup first.");
      return;
    }

    const savedUser = JSON.parse(saved);
    if (
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      await AsyncStorage.setItem("token", "demo-token");
      setUser(savedUser);
    } else {
      alert("Invalid email or password");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
