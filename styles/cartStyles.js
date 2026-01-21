import { StyleSheet } from "react-native";

const PRIMARY = "#234C6A";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1d9e6",
  },

  /* Header */
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 16,
  },

  /* List */
  listContent: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#555",
  },

  /* Cart Item */
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: PRIMARY,
    fontWeight: "700",
    marginTop: 4,
  },

  /* Quantity */
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 6,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: "600",
  },

  deleteBtn: {
    padding: 4,
  },

  /* Summary */
  summary: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARY,
  },

  checkoutBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 85,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
