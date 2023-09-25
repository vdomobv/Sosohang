import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function CartProduct({
  product,
  productCheck,
  onCheckChange,
  updateTotalPrice,
  totalPrice,
  setSelectedProducts,
  shopName,
}) {
  const [isChecked, setIsChecked] = useState(productCheck);
  const [productCount, setProductCount] = useState(product.count);

  useEffect(() => {
    setIsChecked(productCheck);
  }, [productCheck]);

  useEffect(() => {
    product["shopName"] = shopName;
    if (isChecked) {
      setSelectedProducts((prevSet) => new Set([...prevSet, product]));
    } else {
      setSelectedProducts((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(product);
        return newSet;
      });
    }
  }, [isChecked]);

  return (
    <View style={styles.container}>
      <Checkbox
        totalPrice={totalPrice}
        value={isChecked}
        onValueChange={() => {
          const newCheck = !productCheck;
          setIsChecked(newCheck);
          onCheckChange(newCheck);
          if (newCheck) {
            updateTotalPrice(productCount * product.price);
          } else {
            updateTotalPrice(-productCount * product.price);
          }
        }}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Image style={{ flex: 2 }} source={product.image}></Image>
      <View style={{ flex: 4 }}>
        <Text style={styles.textBold}>{product.name}</Text>
        <Text>{product.price} 원</Text>

        <View style={styles.counter}>
          <Ionicons
            name="remove"
            style={styles.minus}
            onPress={() => {
              if (productCount > 1) {
                setProductCount(productCount - 1);
                if (isChecked) {
                  updateTotalPrice(-product.price);
                }
              }
            }}
          />
          <Text>{productCount}</Text>
          <Ionicons
            name="add"
            style={styles.plus}
            onPress={() => {
              setProductCount(productCount + 1);
              if (isChecked) {
                updateTotalPrice(+product.price);
              }
            }}
          />
        </View>
        <Text style={[styles.textBold, { textAlign: "right" }]}>
          {productCount * product.price} 원
        </Text>
      </View>
    </View>
  );
}
