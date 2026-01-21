import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useCart } from "../../context/CartContext";

const PRIMARY = "#1B3C53";
const INACTIVE = "#9aa6b2";
const { width } = Dimensions.get("window");

export default function TabLayout() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const renderIcon = (name, focused, badge = false) => (
    <View style={focused ? styles.glowWrapper : styles.inactiveWrapper}>
      <View style={focused ? styles.activeTab : styles.inactiveTab}>
        <Ionicons
          name={name}
          size={26}
          color={focused ? "#fff" : INACTIVE}
        />

        {badge && totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(focused ? "home" : "home-outline", focused),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(focused ? "grid" : "grid-outline", focused),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(focused ? "cart" : "cart-outline", focused, true),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(focused ? "person" : "person-outline", focused),
        }}
      />
    </Tabs>
  );
}



const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,

    alignSelf: "center",
    width: width -1,     // 🔥 responsive width
    maxWidth: 440,        // optional limit for tablets

    height: 72,
    borderRadius: 40,
    backgroundColor: "#fff",

    elevation: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  tabItem: {
    top: 15,
  },

  glowWrapper: {
    width: 90,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(27, 60, 83, 0.15)",
  },

  activeTab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  inactiveWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveTab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#e63946",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },


});
