import { StyleSheet } from "react-native";

const PRIMARY = "#052659";
const SECONDARY = "#0A3D62";
const ACCENT = "#FFB703";
const BG = "#F4F7FB";

export default StyleSheet.create({
  /* ================= CONTAINER ================= */
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 18,
    paddingTop: 60,
  },

  /* ================= PROFILE CARD ================= */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY,
    borderRadius: 24,
    padding: 18,
    marginTop: 10,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: SECONDARY,
  },

  avatarPlaceholder: {
    backgroundColor: SECONDARY,
  },

  avatarInitials: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  email: {
    fontSize: 14,
    color: "#E2E8F0",
    marginTop: 4,
  },

  /* ================= MENU GRID ================= */
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 22,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  menuText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: PRIMARY,
  },

  /* ================= DANGER / LOGOUT ================= */
  dangerCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FECACA",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  dangerText: {
    color: "#DC2626",
    fontWeight: "700",
  },
});