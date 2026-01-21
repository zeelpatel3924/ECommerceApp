import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/accountStyles";

export default function Settings() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <View style={[styles.header, { flexDirection: "row", alignItems: "center" }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={26} color="#234C6A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings Cards */}
      <View style={styles.menuGrid}>
        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          rightComponent={
            <Switch value={darkMode} onValueChange={setDarkMode} />
          }
        />

        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          rightComponent={
            <Switch value={notifications} onValueChange={setNotifications} />
          }
        />

        <SettingItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={() => router.push("/change-password")}
        />

        <SettingItem
          icon="person-outline"
          title="Edit Profile"
          onPress={() => router.push("/edit-profile")}
        />

        <SettingItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() => router.push("/support")}
        />

        <SettingItem
          icon="information-circle-outline"
          title="About App"
          onPress={() => router.push("/about")}
        />
      </View>
    </ScrollView>
  );
}

/* Reusable Setting Item */
function SettingItem({ icon, title, rightComponent, onPress }) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={26} color="#234C6A" />
        <Text style={[styles.menuText, { marginLeft: 10 }]}>{title}</Text>
      </View>

      {rightComponent && <View>{rightComponent}</View>}
    </TouchableOpacity>
  );
}
