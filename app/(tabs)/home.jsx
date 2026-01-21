import React from "react";
import { ScrollView } from "react-native";

import BannerSlider from "../../components/BannerSlider";
import CategoryList from "../../components/CategoryList";
import Header from "../../components/Header";
import HorizontalProductList from "../../components/HorizontalProductList";
import ProductGrid from "../../components/ProductGrid";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";

import styles from "../../styles/homeStyles";
import { BEST_SELLING } from "../data/BestSelling";
import { GROCERY_PRODUCTS }from "../data/Groceryproducts";
import { PRODUCTS } from "../data/products";
import {IMAGES} from "@/constants/image"

export default function Home() {
  const categories = [
    { id: 1, name: "Mobiles", image: IMAGES.ct1 },
    { id: 2, name: "Fashion", image: IMAGES.ct2 },
    { id: 3, name: "Electronics", image: IMAGES.ct3 },
    { id: 4, name: "Appliances", image: IMAGES.ct4},
    { id: 5, name: "Home & Kitchen", image: IMAGES.ct5 },
    { id: 6, name: "Sports", image:IMAGES.ct6 },
  ];

  const banners = [
    "https://t4.ftcdn.net/jpg/17/91/88/69/240_F_1791886944_DDsG9lPlQ60vKCXcV5drarkEmVusITcm.jpg",
    "https://t3.ftcdn.net/jpg/05/26/53/52/240_F_526535232_3FG0tckX1I3yAaHqqBeCdt0MVE1A5UQ2.jpg",
    "https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg",
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <SearchBar />
      <CategoryList categories={categories} />
      <BannerSlider banners={banners} />

      <SectionHeader title="Suggested for you" />
      <ProductGrid products={PRODUCTS} />

      <SectionHeader title="Best Selling" />
      <HorizontalProductList data={BEST_SELLING} />

      <SectionHeader title="Grocery Products" />
      <HorizontalProductList data={GROCERY_PRODUCTS} />

      <SectionHeader title="Top Products" />
      <ProductGrid products={PRODUCTS} />
    </ScrollView>
  );
}






//badhi image and icon svg use karvana
//product image nu curve set karvanu 
//navigation page banavanu je badh page handdle kare
// home icon category icon 
// category page ma left scroll  
//setting ma hindi english 
//log in sign up working