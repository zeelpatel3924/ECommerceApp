import { StyleSheet } from "react-native";
const PRIMARY = "#234C6A";
const BG = "#d1d9e6";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: BG,
    padding: 16,
    marginTop: 50,
  },

  /* Profile Card */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#eee",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY,
  },

  email: {
    marginTop: 4,
    color: "#6b7f90",
    fontSize: 14,
  },

  /* Menu Grid */
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 22,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
  },

  menuText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY,
  },

  dangerCard: {
    borderWidth: 1,
    borderColor: "#E63946",
  },
});

export default styles;
