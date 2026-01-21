import { useRouter } from "expo-router";
import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/accountStyles";

export default function Account() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Clear user session or token here
            router.replace("/login"); // Redirect to login page
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image style={styles.avatar} />
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.name}>Zeel Patel</Text>
          <Text style={styles.email}>zeel@example.com</Text>
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
      <Text style={[styles.menuText, danger && { color: "#E63946" }]}>{title}</Text>
    </TouchableOpacity>
  );
}
