import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  /* ================= SCREEN ================= */
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  scrollContent: {
    paddingBottom: 140,
    flexGrow: 1,
  },

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  subText: {
    color: "#64748B",
    fontSize: 12,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    color: "#1E293B",
    fontSize: 18,
    fontWeight: "700",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 14,
  },

  /* ================= CART BADGE ================= */
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  /* ================= SEARCH ================= */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 18,
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },

  searchPlaceholder: {
    color: "#94A3B8",
  },

  /* ================= CATEGORY CHIP ================= */
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 10,
  },

  activeChip: {
    backgroundColor: "#1B3C53",
  },

  categoryText: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#FFFFFF",
  },

  /* ================= CATEGORY BOX ================= */
  catBox: {
    alignItems: "center",
    marginRight: 16,
    marginTop: 20,
  },

  catImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  catText: {
    color: "#1E293B",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },

  /* ================= SECTION ================= */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  sectionTitle: {
    color: "#1E293B",
    fontSize: 20,
    fontWeight: "700",
  },

  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  /* ================= PRODUCT GRID ================= */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 5,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  likeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },

  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },

  productTitle: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

  bottomRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 8,
},

viewBtn: {
  backgroundColor: "#2563EB",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},

viewText: {
  color: "#fff",
  fontSize: 11,
  fontWeight: "700",
},

price: {
  color: "#1B3C53",
  fontSize: 16,
  fontWeight: "700",
},

  /* ================= HORIZONTAL GROCERY CARD ================= */
  Grocerycard: {
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginRight: 14,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  GroceryImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },

  GroceryTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#1E293B",
  },

  GroceryPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563EB",
    marginTop: 4,
  },
});

export default styles;