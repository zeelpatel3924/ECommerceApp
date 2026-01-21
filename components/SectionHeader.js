import { View, Text } from "react-native";
import styles from "../styles/homeStyles";

export default function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View All</Text>
    </View>
  );
}
