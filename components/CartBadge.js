// components/CartBadge.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useRouter } from 'expo-router';

export default function CartBadge({ iconSize = 22 , color='#0a0a0aff' }) {
  const { cart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, it) => sum + (it.qty || 0), 0);

  return (
    <TouchableOpacity onPress={() => router.push('/cart')} style={{ position: 'relative' }}>
      <Ionicons name="cart-outline" size={iconSize} color={color} />
      {total > 0 && (
        <View style={styles.badge}>
          <Text style={styles.count}>{total}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#456882',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  count: { color: '#f0eeeeff', fontSize: 11, fontWeight: '700' },
});