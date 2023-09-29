import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function CartProduct({
  data,
  productCheck,
  onCheckChange,
  updateTotalPrice,
  totalPrice,
  setSelectedProducts,
}) {
  const [isChecked, setIsChecked] = useState(productCheck);
  const [productCount, setProductCount] = useState(data.quantity);

  // useEffect(() => {
  //   setIsChecked(productCheck);
  // }, [productCheck]);

  // useEffect(() => {
  //   if (isChecked) {
  //     setSelectedProducts((prevSet) => new Set([...prevSet, product]));
  //   } else {
  //     setSelectedProducts((prevSet) => {
  //       const newSet = new Set(prevSet);
  //       newSet.delete(product);
  //       return newSet;
  //     });
  //   }
  // }, [isChecked]);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        // totalPrice={totalPrice}
        value={false}
        // onValueChange={() => {
        //   const newCheck = !productCheck;
        //   setIsChecked(newCheck);
        //   onCheckChange(newCheck);
        //   if (newCheck) {
        //     updateTotalPrice(productCount * product.price);
        //   } else {
        //     updateTotalPrice(-productCount * product.price);
        //   }
        // }}
        // color={isChecked ? "#4630EB" : undefined}
      />
      <Image style={{ flex: 2, marginRight: 10 }} source={data.product.productImage}></Image>
      <View style={{ flex: 4 }}>
        <Text style={[styles.textBold, { marginTop: 5 }]}>{data.product.productName}</Text>
        <Text style={styles.price}>{data.product.productPrice} 원</Text>

        <View style={styles.counter}>
          <Ionicons
            name="remove-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              if (productCount > 1) {
                setProductCount(productCount - 1);
                if (isChecked) {
                  updateTotalPrice(-product.price);
                }
              }
            }}
          />
          <Text style={styles.count}>{productCount}</Text>
          <Ionicons
            name="add-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              setProductCount(productCount + 1);
              if (isChecked) {
                updateTotalPrice(+data.product.productPrice);
              }
            }}
          />
        </View>
        <Text style={[styles.textBold, { textAlign: "right", marginRight: 10 }]}>
          {productCount * data.product.productPrice} 원
        </Text>
      </View>
    </View>
  );
}
