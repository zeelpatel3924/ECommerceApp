import axios from "axios";

/* ================= AXIOS INSTANCE ================= */

const API = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= SIMPLE CACHE ================= */

const cache = new Map();

const getCachedData = async (key, requestFn) => { 
  if (cache.has(key)) {
    return cache.get(key);
  }

  try {
    const data = await requestFn();
    cache.set(key, data);
    return data;
  } catch (error) {
    throw error;
  }
};

/* ================= ERROR HANDLER ================= */

const handleError = (error) => {
  if (error.response) {
    console.log("API Error:", error.response.data);
  } else if (error.request) {
    console.log("Network Error:", error.message);
  } else {
    console.log("Unexpected Error:", error.message);
  }
  throw error;
};

/* ================= PRODUCTS ================= */

export const getAllProducts = async (limit = 20, skip = 0) => {
  const key = `products-${limit}-${skip}`;

  return getCachedData(key, async () => {
    try {
      const { data } = await API.get("/products", {
        params: { limit, skip },
      });
      return data.products;
    } catch (error) {
      handleError(error);
      return [];
    }
  });
};

// Get all categories
export const getCategories = async () => {
  const key = "categories";

  return getCachedData(key, async () => {
    try {
      const { data } = await API.get("/products/categories");
      return data;
    } catch (error) {
      handleError(error);
      return [];
    }
  });
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const key = `category-${category}`;

  return getCachedData(key, async () => {
    try {
      const { data } = await API.get(
        `/products/category/${encodeURIComponent(category)}`,
      );
      return data.products;
    } catch (error) {
      handleError(error);
      return [];
    }
  });
};

// Get single product by ID
export const getProductById = async (id) => {
  const key = `product-${id}`;

  return getCachedData(key, async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      return data;
    } catch (error) {
      handleError(error);
      return null;
    }
  });
};
