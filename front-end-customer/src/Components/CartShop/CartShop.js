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
  updateTotalPrice,
  totalPrice,
  setSelectedProducts
}) {
  // const [shopChecked, setShopChecked] = useState(checked);
  // // const [selectedProducts, setSelectedProducts] = useState(new Set());

  // useEffect(() => {
  //   const allProductsChecked = checkedProducts.every((val) => val === true);
  //   if (allProductsChecked) {
  //     onCheckChange(true);
  //   }
  // }, [checkedProducts]);

  // useEffect(() => {
  //   setShopChecked(checked);
  // }, [checked]);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.shopName}>
          <Checkbox
            style={styles.checkBox}
            value={checked}
          // onValueChange={() => {
          //   const newCheckedState = !shopChecked;
          //   setShopChecked(newCheckedState);
          //   onCheckChange(newCheckedState);
          //   const shopTotalPrice = data.products.reduce(
          //     (acc, curr) => acc + curr.count * curr.price,
          //     0
          //   );
          //   if (newCheckedState) {
          //     updateTotalPrice(shopTotalPrice);
          //   } else {
          //     updateTotalPrice(-shopTotalPrice);
          //   }
          // }}
          // color={shopChecked ? "#4630EB" : undefined}
          />{" "}
          {data[0].product.store.storeName} <Ionicons style={styles.shopName} name="home-outline" />
        </Text>
        <View style={styles.products}>
          {data.map((d) => {
            return (
              <CartProduct
                key={d.cartSeq}
                data={d}

              // totalPrice={totalPrice}
              // checkedProduct={checkedProduct[key]}
              // updateTotalPrice={updateTotalPrice}
              // onCheckChange={(productChecked) => {
              //   const newCheckedProducts = [...checkedProducts];
              //   newCheckedProducts[index] = productChecked;
              //   setCheckedProducts(newCheckedProducts);
              // }}
              // setSelectedProducts={setSelectedProducts}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
