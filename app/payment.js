import { useRouter } from "expo-router";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import styles from "../styles/accountStyles"; // reuse your styles

export default function Payment() {
  const router = useRouter();

  // Example saved payment methods
  const [payments, setPayments] = useState([
    { id: 1, type: "Visa", last4: "1234" },
    { id: 2, type: "MasterCard", last4: "5678" },
  ]);

  // Add a new payment (placeholder)
  const addPayment = () => {
    const newPayment = {
      id: payments.length + 1,
      type: "New Card",
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
    };
    setPayments([...payments, newPayment]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <View style={[styles.header, { flexDirection: "row", alignItems: "center" }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={26} color="#234C6A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      {/* Payment Methods */}
      <View style={{ padding: 16 }}>
        {payments.map((payment) => (
          <View key={payment.id} style={[styles.menuCard, { marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
            <Text style={styles.menuText}>
              {payment.type} **** {payment.last4}
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#234C6A" />
          </View>
        ))}

        {/* Add Payment Button */}
        <TouchableOpacity
          style={[styles.menuCard, { marginTop: 16, flexDirection: "row", justifyContent: "center" }]}
          onPress={addPayment}
        >
          <Ionicons name="add-circle-outline" size={24} color="#234C6A" />
          <Text style={[styles.menuText, { marginLeft: 8 }]}>Add Payment Method</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
