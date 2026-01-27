import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
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

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          // Clear user session in AsyncStorage and Redux, then redirect
          try {
            dispatch(logoutAction());
            await logoutUtil();
          } catch (_err) {
            // fallback redirect
            router.replace("/login");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        {user && user.name ? (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitials}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </Text>
          </View>
        ) : (
          <Image style={styles.avatar} />
        )}
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.name}>{user?.name ?? "Guest User"}</Text>
          <Text style={styles.email}>{user?.email ?? "Not signed in"}</Text>
        </View>
      </View>

      {/* Menu Cards */}
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
        {/* red logout button removed (logout available in menu) */}
      </View>
    </ScrollView>
  );
}

/* Reusable Menu Card */
function MenuCard({ icon, title, danger, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.menuCard, danger && styles.dangerCard]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={26} color={danger ? "#E63946" : "#234C6A"} />
      <Text style={[styles.menuText, danger && { color: "#E63946" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
