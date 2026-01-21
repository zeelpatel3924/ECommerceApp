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
    borderRadius:22,
  },

  backButton: {
  position: "absolute",
  top: 50,              // adjust if needed (status bar safe)
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
  position: "absolute",       // floating on top of the image
  top: 12,                    // distance from top of image
  right: 12,                  // distance from right of image
  width: 40,
  height: 40,
  borderRadius: 20,           // circular button
  backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent background
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,                 // make sure it's on top of the image
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,               // for Android shadow
},

  /* ================= WISHLIST ================= */
  // heart: {
  //   position: "absolute",
  //   top: Platform.OS === "ios" ? 55 : 40,
  //   right: 16,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: "rgba(0,0,0,0.55)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 10,
  // },

  /* ================= PRODUCT INFO ================= */
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B3C53",
    marginTop: 16,
    paddingHorizontal: 16,
    lineHeight: 28,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 6,
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



  price: {
    paddingHorizontal: 16,
    marginTop: 14,
    fontSize: 24,
    fontWeight: "800",
    color: PRIMARY,
  },

  /* ================= QUANTITY ================= */
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },

  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#e6edf3",
    justifyContent: "center",
    alignItems: "center",
  },

  qty: {
    marginHorizontal: 22,
    fontSize: 18,
    fontWeight: "700",
    color: "#1B3C53",
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
    bottom: 0,
    width: "100%",
    padding: 22,
    backgroundColor: "#1b3c53",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    elevation: 12,
  },

  cartBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  cartText: {
  
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  /* ================= EMPTY ================= */
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
