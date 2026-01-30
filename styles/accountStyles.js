import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /* ================= CONTAINER ================= */
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 16,
    paddingTop: 60, 
  },

  /* ================= PROFILE CARD ================= */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B3C53",
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#456882",
  },

  avatarPlaceholder: {
    backgroundColor: "#456882",
  },

  avatarInitials: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  email: {
    fontSize: 13,
    color: "#dbe4ec",
    marginTop: 2,
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
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",

    /* Shadow (Android + iOS) */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },

  menuText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#234C6A",
  },

  /* ================= DANGER / LOGOUT ================= */
  dangerCard: {
    borderWidth: 1,
    borderColor: "#F3B6BC",
    backgroundColor: "#FFF5F6",
  },

  dangerText: {
    color: "#E63946",
  },
});
