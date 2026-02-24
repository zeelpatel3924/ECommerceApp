import { StyleSheet, Platform } from "react-native";

const PRIMARY = "#052659";       // Same deep brand blue
const SECONDARY = "#0A3D62";
const ACCENT = "#FFB703";
const BG = "#F4F7FB";            // Softer background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ================= HEADER ================= */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 18,
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 6,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 45,
    marginHorizontal: 14,
    paddingHorizontal: 15,

    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android Shadow
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: PRIMARY,
  },

  /* ================= BODY ================= */
  body: {
    flex: 1,
    flexDirection: "row",
  },

  /* LEFT SIDEBAR */
  categoryContainer: {
    width: 140,
    backgroundColor: SECONDARY,
    paddingVertical: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },

  scrollContent: {
    paddingBottom: 140,
    flexGrow: 1,
  },

  categoryClosed: {
    width: 45,
    paddingVertical: 0,
  },

  categoryItem: {
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 4,
  },

  categoryText: {
    fontSize: 13,
    color: "#EAF1F8",
    fontWeight: "500",
  },

  activeCategory: {
    backgroundColor: ACCENT,
    borderRadius: 10,
    marginHorizontal: 12,
    paddingVertical: 12,
    elevation: 4,
  },

  activeCategoryText: {
    color: PRIMARY,
    fontWeight: "700",
  },

  pinButton: {
    position: "absolute",
    right: -15,
    top: "40%",
    width: 38,
    height: 38,
    backgroundColor: ACCENT,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  /* RIGHT PRODUCTS */
  productContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 15,
    backgroundColor: BG,
  },

  verticalGrid: {
    paddingBottom: 20,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    width: "48%",

    // iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    // Android Shadow
    elevation: 5,
  },

  productImage: {
    width: "100%",
    height: 130,
    borderRadius: 14,
    resizeMode: "cover",
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#1E293B",
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY,
    marginTop: 6,
  },

  noDataText: {
    marginTop: 40,
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
  },
});

export default styles;