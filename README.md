# ECommerceApp — architecture and developer notes

This README documents the architecture and runtime behavior of this Expo + React Native project so engineers can onboard quickly and make safe changes.

## Quick start

- Install dependencies: `npm install`
- Start dev server: `npx expo start -c`

## High-level overview

- Framework: React Native (Expo) using the Expo Router for file-based routing.
- State: mix of Redux (auth) and React Context (cart + wishlist). See "State & Persistence" below.
- Persistence: AsyncStorage for general caching; session is stored via a secure wrapper (Expo SecureStore when available) under the `session` key.

## Why this structure

- Auth is centralized in Redux (`src/store/authSlice.js`) because authentication is global and many screens need the current user.
- Cart and wishlist are currently implemented as React Context providers for easy scoping and minimal component changes. The project also contains a Redux `cartSlice.js` (unused) to make migration to Redux easier.

## Project layout (important files)

- `app/` — screen and route files (Expo Router)
  - `app/(tabs)/home.jsx` — Home tab with categories & search
  - `app/(tabs)/categories.tsx` — Categories screen (can auto-select via params)
  - `app/product/[id].jsx` — Product details with image carousel
  - `app/login.jsx`, `app/register.jsx` — Auth screens
  - `app/splash.jsx` — Startup splash; decides initial route depending on session
- `context/`
  - `CartContext.jsx` — per-user cart persistence, guest→user merge, debounced saves
  - `WishlistContext.js` — per-user wishlist persistence and merge
- `src/store/`
  - `authSlice.js` — Redux slice for authentication (register/login/init/logout)
  - `cartSlice.js` — a ready-to-use Redux cart slice (project currently uses Context)
- `utils/`
  - `storage.js` — safe AsyncStorage helpers and per-user key helpers
  - `secureStorage.js` — wrapper that prefers Expo SecureStore and falls back to AsyncStorage
  - `auth.js` — helpers for session access & optional user cache clearing

## State & persistence details

- Session (authenticated user)
  - Key used: `session` (now saved via `utils/secureStorage.js` — SecureStore when installed, fallback to AsyncStorage).
  - Auth slice thunks: `registerUser`, `loginUser`, `initAuth` (init reads session during app startup).

- Cart & Wishlist (per-user)
  - Keys: `cart:<userId|email>` and `wishlist:<userId|email>`, or `cart:guest` / `wishlist:guest` for guest users.
  - Behavior:
    - Guest users get `cart:guest` and `wishlist:guest` persisted locally.
    - When a user logs in, the contexts merge guest data into the user data (summing quantities for cart). The guest key is removed after merge.
    - Saves are debounced (300ms) to reduce IO.

## Security note

- Sessions and other sensitive strings are stored through `utils/secureStorage.js`. For production, install and enable Expo SecureStore:

```powershell
npx expo install expo-secure-store
```

If SecureStore is not installed the code falls back to AsyncStorage but you should install SecureStore for device-level encryption.

## Server sync (recommended)

- Current status: cart/wishlist are local only. To support multi-device carts you should implement a server-side sync.
- Recommended server API endpoints (example):
  - `GET /users/:id/cart`
  - `POST /users/:id/cart` (replace or merge)
  - `PATCH /users/:id/cart/items` (add/remove/update item qty)
  - same endpoints for `/wishlist`
- Client-side strategy (recommended):
  - On login, fetch server-side cart and merge with local cart (merge sums quantities by product id).
  - Use optimistic local updates + background sync; queue updates when offline and replay when network returns.
  - Use conflict resolution policy (e.g., sum quantities, last-write-wins for metadata).

## Redux vs Context

- Tradeoffs:
  - Context is lightweight and currently used to avoid a large refactor. Good for small-to-medium apps.
  - Redux gives you a single source-of-truth, middleware (thunks/sagas), and DevTools. It simplifies server-sync and debugging at scale.
- Suggested migration plan:
  - Quick path (low friction): adapt the Context providers to dispatch to Redux under the hood (adapter pattern).
  - Full migration: replace Context usage across components with Redux hooks (more effort but cleaner for large apps).

## Next steps I can implement for you (pick one)

1. Enable secure session storage fully (I can run the `expo install expo-secure-store` command here if you want).
2. Scaffold server-sync helpers and wire `CartContext` to call a `syncCart` hook (no backend required — it will be a safe no-op until you configure endpoints).
3. Migrate cart & wishlist into Redux (adapter or full migration). I recommend the adapter first if you want minimal changes.

## Developer notes

- Persistence keys used by the app:
  - `session` — secure session JSON
  - `cart:<userId|email>` or `cart:guest`
  - `wishlist:<userId|email>` or `wishlist:guest`
- If you change the user identifier strategy, update `utils/storage.js` so keys remain stable.

## Contacts & references

- Expo docs: https://docs.expo.dev
- SecureStore: https://docs.expo.dev/versions/latest/sdk/securestore/

If you want, I can implement one of the "Next steps" above — tell me which and I will proceed and run the necessary checks.
