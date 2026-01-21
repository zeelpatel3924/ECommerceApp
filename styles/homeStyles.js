import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    backgroundColor: "#d1d9e6",
    padding: 16,
  },

  /* Header */


  cartBadge: {
  position: "absolute",
  top: -10,
  right: -6,
  backgroundColor: "#456882",
  borderRadius: 10,
  minWidth: 18,
  height: 18,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 4,
},

cartBadgeText: {
  color: "#fff",
  fontSize: 11,
  fontWeight: "700",
},


  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subText: {
    color: "#1B1B1B",
    fontSize: 12,
  },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: {
    color: "#1B1B1B",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerIcons: { flexDirection: "row" },

   /* Search */
searchBox: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 24,

  height: 48,
  width: "100%",          // responsive
  maxWidth: 420,          // optional for tablets

  marginTop: 5,
  paddingHorizontal: 16,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
},

searchInput: {
  flex: 1,
  marginLeft: 12,        // reduced for small screens

  fontSize: 15,
  color: "#1B3C53",
  fontWeight: "500",

  paddingVertical: 0,
},

searchPlaceholder: {
  fontSize: 15,
  color: "#9aa7b2",
  fontWeight: "400",
},



  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e9edf3",
    marginRight: 10,
  },

  activeChip: {
    backgroundColor: "#1B3C53",
  },

  categoryText: {
    fontSize: 13,
    color: "#6b7f90",
    fontWeight: "600",
  },

  activeChipText: {
    color: "#fff",
  },

  /* Categories */
  catBox: {
    alignItems: "center",
    marginRight: 14,
    marginBottom: 10,
    marginTop: 20,
  },
  catImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff20",
    padding: 10,
  },
  catText: {
    color: "#1B3c53",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
  },

  /* Section */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  sectionTitle: {
    color: "#1B3C53",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#1B3C53",
    fontSize: 13,
  },

  /* Product Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#456882",
    borderRadius: 6,
    padding: 8,
    marginBottom: 14,
    position: "relative",
  },
  likeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 6,
    marginBottom: 10,
  },
  productTitle: {
    color: "#ddd",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewBtn: {
    backgroundColor: "#8FABD4",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  viewText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  price: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  Grocerycard:{
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginRight: 10,
    padding: 8,
    elevation: 3,
  },

  GroceryImage: {
    width: "100%",
    height: 110,
    borderRadius:6,
    overflow: "hidden",
  },

  GroceryTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 6,
  },

  GroceryPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B3C53",
  },
});
export default styles;
