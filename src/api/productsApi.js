import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getAllProducts = async () => {
  const res = await API.get("/products?limit=100");
  return res.data.products;
};

export const getCategories = async () => {
  const res = await API.get("/products/categories");
  return res.data;
};

export const getProductsByCategory = async (category) => {
  const res = await API.get(`/products/category/${category}`);
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
};
