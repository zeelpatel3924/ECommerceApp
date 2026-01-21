import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
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
  useEffect(() => {
    const init = async () => {
      const start = Date.now();

      // ensure Redux has auth initialized too
      store.dispatch(initAuth());

      let session = null;
      try {
        session = await getUserSession();
      } catch (_e) {
        // ignore
      }

      // Minimal splash display time for UX
      const elapsed = Date.now() - start;
      const minMs = 3000; // show splash for 3000ms (3s)
      if (elapsed < minMs)
        await new Promise((r) => setTimeout(r, minMs - elapsed));

      if (session) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/login");
      }
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <Image
        source={require("../assets/images/splash-icon.png")}
        style={styles.logo}
      />

      <ActivityIndicator size="large" color="#fff" style={styles.indicator} />

      <Text style={styles.title}>E-Commerce</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b3e26",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 24,
  },
  indicator: {
    marginTop: 4,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
});
