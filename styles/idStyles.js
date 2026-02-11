import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const PRIMARY = "#234C6A";
const BG = "#f7f9fc";

export default StyleSheet.create({
  /* ================= CONTAINER ================= */
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    paddingBottom: 140, // enough space for sticky bar on all devices
  },

  /* ================= IMAGE ================= */
  imageWrapper: {
    width: "100%",
    height: width * 0.9,
    position: "relative",
    backgroundColor: "#eaeaea",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  /* ================= HEADER ================= */
  header: {
    backgroundColor: PRIMARY,
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  cartIcons: {
    position: "absolute",
    right: 20,
    top: 60,
    flexDirection: "row",
    gap: 16,
    borderRadius: 22,
  },

  backButton: {
    position: "absolute",
    top: 50, // adjust if needed (status bar safe)
    left: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,

    // Shadow
    elevation: 6, // Android
    shadowColor: "#000", // iOS
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  /* ================= BACK BUTTON ================= */

  heart: {
    position: "absolute", // floating on top of the image
    top: 12, // distance from top of image
    right: 12, // distance from right of image
    width: 40,
    height: 40,
    borderRadius: 20, // circular button
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // make sure it's on top of the image
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // for Android shadow
  },

  /* ================= PRODUCT INFO ================= */
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", //  left & right
    marginTop: 16,
    paddingHorizontal: 16,
  },

  title: {
    flex: 1, // prevents overlap
    fontSize: 25,
    color: "#0F172A",
    fontWeight: "700",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  ratingText: {
    marginLeft: 6,
    color: "#6b7f90",
    fontSize: 14,
  },

  description: {
    paddingHorizontal: 16,
    marginTop: 12,
    color: "#555",
    fontSize: 15,
    lineHeight: 22,
  },

  /* =============== DOTS ================ */
  dotsContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 12,
    height: 8,
    borderRadius: 4,
  },

  /* ================= RELATED PRODUCTS ================= */

  relatedSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },

  relatedTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3C53",
    marginBottom: 12,
  },

  relatedList: {
    paddingRight: 16,
  },

  relatedCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    elevation: 4,
  },

  relatedImage: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },

  relatedName: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#1B3C53",
  },

  relatedPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#234C6A",
  },

  priceQtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal :16,
  },

  price: {
    fontSize: 25,
    fontWeight: "900",
    color: "#0F172A",

  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:"#a8b3cdff",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
fontWeight:"bold"
  },

  qtyBtn: {
    padding: 4,
    
  },

  qty: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#0F172A",
    fontWeight:"900"
  },

  addedText: {
    marginTop: 12,
    marginLeft: 16,
    color: "#2a9d8f",
    fontWeight: "600",
    fontSize: 14,
  },

  /* ================= STICKY BAR ================= */
  stickyBar: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#a8b3cdff",
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
  },

  cartIconBtn: {
    width: 80,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#e63946",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  ViewBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#234C6A",
    justifyContent: "center",
    alignItems: "center",
  },

  ViewBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ================= EMPTY ================= */
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
