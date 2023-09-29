import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

import CartProduct from "../CartProduct/CartProduct";

export default function CartShop({
  data,
  checked,
  onCheckChange,
  totalPrice,
  updateTotalPrice,
  setSelectedProducts
}) {
  const [shopChecked, setShopChecked] = useState(checked);
  const [checkedProducts, setCheckedProducts] = useState(
    data.products.map(() => false)
  );

  // const [selectedProducts, setSelectedProducts] = useState(new Set());

  useEffect(() => {
    const allProductsChecked = checkedProducts.every((val) => val === true);
    if (allProductsChecked) {
      onCheckChange(true);
    }
  }, [checkedProducts]);

  useEffect(() => {
    setShopChecked(checked);
    setCheckedProducts(data.products.map(() => checked));
  }, [checked]);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.shopName}>
          <Checkbox
            style={styles.checkBox}
            value={checked}
            onValueChange={() => {
              const newCheckedState = !shopChecked;
              setShopChecked(newCheckedState);
              setCheckedProducts(data.products.map(() => newCheckedState));
              onCheckChange(newCheckedState);
              const shopTotalPrice = data.products.reduce(
                (acc, curr) => acc + curr.count * curr.price,
                0
              );
              if (newCheckedState) {
                updateTotalPrice(shopTotalPrice);
              } else {
                updateTotalPrice(-shopTotalPrice);
              }
            }}
            color={shopChecked ? "#4630EB" : undefined}
          />{" "}
          {data.name} <Ionicons style={styles.shopName} name="home-outline" />
        </Text>
        <View style={styles.products}>
          {data.products.map((d, index) => {
            return (
              <CartProduct
                key={index}
                totalPrice={totalPrice}
                productCheck={checkedProducts[index]}
                updateTotalPrice={updateTotalPrice}
                onCheckChange={(productChecked) => {
                  const newCheckedProducts = [...checkedProducts];
                  newCheckedProducts[index] = productChecked;
                  setCheckedProducts(newCheckedProducts);
                }}
                product={d}
                shopName ={data.name}
                setSelectedProducts={setSelectedProducts}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
