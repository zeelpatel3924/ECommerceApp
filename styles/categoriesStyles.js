
import { StyleSheet } from "react-native";

const PRIMARY = "#234C6A";
const BG = "#d1d9e6";

const styles = StyleSheet.create({
  /* ================= ROOT ================= */
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ================= HEADER ================= */
  header: {
    paddingTop:120,
    paddingBottom: 22,
    paddingHorizontal: 20,
    backgroundColor: PRIMARY,
  },

 
  headerIcons: {
    position: "absolute",
    right: 20,
    top: 50,
    flexDirection: "row",
    gap: 16,
  },

  /* ================= BODY ================= */
  body: {
    flex: 1,
    flexDirection: "row",
  },

 searchBox: {
  flexDirection: "row",
  alignItems: "center",

  marginLeft: 40,
  justifyContent: "space-between",
  backgroundColor: "#fff",
  borderRadius: 24,
  height: 48,
   width: "80%",          // responsive
   maxWidth: 420,          // optional for tablets
  marginTop: 30,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
},

searchInput: {
  flex: 1,
  marginLeft: 20,

  fontSize: 15,
  color: "#1B3C53",
  fontWeight: "500",

  paddingVertical: 0, // keeps input vertically centered
},

searchPlaceholder: {
  fontSize: 15,
  color: "#9aa7b2",
  fontWeight: "400",
},


//left scrool
categoryItem: {
  paddingVertical: 8,            // smaller height
  alignItems: "center",
  marginBottom: 6,                // less space between items
},


categoryText: {
  fontSize: 13,                   // smaller text
  color: "#fff",
  fontWeight: "500",
  textAlign: "center",
},

activeCategory: {
  backgroundColor: "#fff",
  borderRadius: 6,               // smaller radius
  marginHorizontal: 12,            // less horizontal margin
  paddingVertical: 16,             // optional padding inside active
  paddingHorizontal: 8,
},

activeCategoryText: {
  color: PRIMARY,
  fontWeight: "700",
  fontSize: 13,                   // match category text size
},


categoryContainer: {
  width: 135,
  backgroundColor: "#456882",
  paddingVertical: 20,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 20,
  elevation: 4,
  position: "relative",
},

categoryClosed: {
  width: 35, //  collapsed width
  paddingVertical: 0,
},

pinButton: {
  position: "absolute",
  right: -12,
  top: "40%",
  transform: [{ translateY: -18 }],
  width: 45,
  height: 45,
  backgroundColor: "#234C6A",
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  elevation: 6,
},



  /* ================= RIGHT PRODUCT SCROLL ================= */
  productContainer: {
  flex: 1,
  paddingHorizontal: 10,
  paddingTop: 10,
  backgroundColor: "#d1d9e6",
},

verticalGrid: {
  paddingBottom: 20,
  gap: 10,
},

verticalCard: {
  backgroundColor: "#fff",
  borderRadius: 6,
  padding: 8,
  marginBottom: 12,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
},

backButton: {
  position: "absolute",
  top: 45,              // adjust if needed (status bar safe)
  left: 16,
  width: 42,
  height: 42,
  borderRadius: 21,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  elevation: 6, 
  shadowColor: "#000", 
  shadowOpacity: 0.15,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},



gridContainer: {
  flexDirection: "row",
  flexWrap: "wrap",   // allows multiple rows
  justifyContent: "space-between",
  paddingBottom: 20,
},

gridCard: {
  backgroundColor: "#fff",
  borderRadius: 6,
  padding: 8,
  marginBottom: 12,
  width: "48%",        // 2 columns with spacing
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
},

productImage: {
  width: "100%",
  height: 120,         // smaller height for compact grid
  borderRadius: 10,
  resizeMode: "cover",
},

productName: {
  fontSize: 13,
  fontWeight: "500",
  marginTop: 6,
  color: "#222",
},

productPrice: {
  fontSize: 13,
  fontWeight: "600",
  color: PRIMARY,
  marginTop: 4,
},

noDataText: {
  marginTop: 30,
  textAlign: "center",
  color: "#888",
  fontSize: 14,
  fontWeight: "500",
},
});


export default styles;
