import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../src/store/authSlice";
import styles from "../../styles/accountStyles";
import { logout as logoutUtil } from "../../utils/auth";

export default function Account() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const initials = React.useMemo(() => {
    if (!user?.name) return "GU";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user?.name]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            dispatch(logoutAction());
            await logoutUtil();
          } finally {
            router.replace("/login");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= PROFILE ================= */}
      <View style={styles.profileCard}>
        <View
          style={[
            styles.avatar,
            user?.name && styles.avatarPlaceholder,
          ]}
        >
          {user?.name ? (
            <Text style={styles.avatarInitials}>{initials}</Text>
          ) : (
            <Ionicons name="person" size={28} color="#fff" />
          )}
        </View>

        <View style={{ marginLeft: 14 }}>
          <Text style={styles.name}>
            {user?.name ?? "Guest User"}
          </Text>
          <Text style={styles.email}>
            {user?.email ?? "Not signed in"}
          </Text>
        </View>
      </View>

      {/* ================= MENU ================= */}
      <View style={styles.menuGrid}>
        <MenuCard
          icon="bag-outline"
          title="My Orders"
          onPress={() => router.push("/orders")}
        />
        <MenuCard
          icon="heart-outline"
          title="Wishlist"
          onPress={() => router.push("/wishlist")}
        />
        <MenuCard
          icon="location-outline"
          title="My Address"
          onPress={() => router.push("/address")}
        />
        <MenuCard
          icon="card-outline"
          title="Payments"
          onPress={() => router.push("/payment")}
        />
        <MenuCard
          icon="settings-outline"
          title="Settings"
          onPress={() => router.push("/settings")}
        />
        <MenuCard
          icon="log-out-outline"
          title="Logout"
          danger
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

/* ================= MENU CARD ================= */
function MenuCard({ icon, title, danger, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.menuCard, danger && styles.dangerCard]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={26}
        color={danger ? "#E63946" : "#234C6A"}
      />
      <Text
        style={[
          styles.menuText,
          danger && styles.dangerText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
