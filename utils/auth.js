import { router } from "expo-router";
import { cartKeyFor, safeRemove, wishlistKeyFor } from "../utils/storage";
import { secureGet, secureRemove } from "./secureStorage"; 

export const getUserSession = async () => {  
  try { 
    const v = await secureGet("session");// get session from secure storage
    return v;
  } catch (err) {
    console.warn("getUserSession error", err);//log error if any
    return null; 
  }
};

export const logout = async () => { //logout function to clear session and redirect to login
  await secureRemove("session"); //remove session from secure storage
  router.replace("/login"); //redirect to login page
};

// optional helper to remove user-specific persisted caches (cart/wishlist)
export async function clearUserCaches(user) {//clear caches for user
  if (!user) return; //if no user, exit
  try {
    await safeRemove(cartKeyFor(user));//remove cart cache
    await safeRemove(wishlistKeyFor(user));//remove wishlist cache
  } catch (err) {
    console.warn("clearUserCaches error", err);//log error if any
  }
}
