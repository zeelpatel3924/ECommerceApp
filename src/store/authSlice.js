import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { secureGet, secureSet } from "../../utils/secureStorage";

export const registerUser = createAsyncThunk("auth/register", async (user) => {
  const users = JSON.parse(await AsyncStorage.getItem("users")) || [];
  const withId = { ...user };
  if (!withId.id) withId.id = Date.now().toString();
  users.push(withId);
  await AsyncStorage.setItem("users", JSON.stringify(users));
  return withId;
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const users = JSON.parse(await AsyncStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) return null;
    try {
      await secureSet("session", JSON.stringify(found));
    } catch (_err) {
      await AsyncStorage.setItem("session", JSON.stringify(found));
    }
    return found;
  },
);

export const initAuth = createAsyncThunk("auth/init", async () => {
  try {
    const session = await secureGet("session");
    try {
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  } catch (_err) {
    try {
      const session = await AsyncStorage.getItem("session");
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, user: null },
  reducers: {
    logout(state) {
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
