import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text } from "react-native";
import Checkbox from 'expo-checkbox';
import { Ionicons } from "@expo/vector-icons";

import Product from "../Product/Product";

export default function CartShop({ data, checked, onCheckChange }) {
  const [shopChecked, setShopChecked] = useState(checked);
  const [checkedProducts, setCheckedProducts] = useState(data.products.map(() => false));

  useEffect(() => {
    const allProductsChecked = checkedProducts.every(val => val === true)
    if(allProductsChecked) {
      onCheckChange(true);
    }
  }, [checkedProducts])

  useEffect(() => {
    setShopChecked(checked);
    setCheckedProducts(data.products.map(() => checked));
  }, [checked]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.shopName}>
          <Checkbox style={styles.checkbox}
            value={checked}
            onValueChange={() => {
              const newCheckedState = !shopChecked;
              setShopChecked(newCheckedState);
              setCheckedProducts(data.products.map(() => newCheckedState)); //
              onCheckChange(newCheckedState);
            }}
            color={shopChecked ? '#4630EB' : undefined} />   {data.name}   <Ionicons name="home-outline" /></Text>
        <View style={styles.products}>
          {
            data.products.map((d, index) => {
              return <Product key={index}
                productCheck={checkedProducts[index]}
                onCheckChange={(productChecked) => {
                  const newCheckedProducts = [...checkedProducts];
                  newCheckedProducts[index] = productChecked;
                  setCheckedProducts(newCheckedProducts);
                }} product={d} />
            })
          }
        </View>
      </View>
    </View>
  );
}

