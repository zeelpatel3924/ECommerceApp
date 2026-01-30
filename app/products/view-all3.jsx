import React from "react";
import { ScrollView } from "react-native";

import ProductGrid from "../../components/ProductGrid";
import styles from "../../styles/viewAllStyles";
import {GROCERY_PRODUCTS} from "../data/Groceryproducts";
import ViewAllHeader from "../../components/ViewAllHeader"; import { useSelector } from "react-redux";

const ViewAll = () => {  


    const cart = useSelector((state) => state.cart.items);
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    > 

      <ViewAllHeader title= "All Products" cart={cart} />
      <ProductGrid products={GROCERY_PRODUCTS} />
    </ScrollView>
  );
};

export default ViewAll;
