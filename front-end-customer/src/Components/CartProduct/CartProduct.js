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
  totalPrice
}) {
  const [isChecked, setIsChecked] = useState(productCheck);

  useEffect(() => {
    setIsChecked(productCheck);
  }, [productCheck]);

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
            updateTotalPrice(product.count * product.price); // add product price to total
          } else {
            updateTotalPrice(-product.count * product.price); // subtract product price from total
          }
        }}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Image style={{ flex: 2 }} source={product.image}></Image>
      <View style={{ flex: 4 }}>
        <Text style={styles.textBold}>{product.name}</Text>
        <Text>{product.price} 원</Text>

        <View style={styles.counter}>
          <Ionicons name="remove" style={styles.minus} />
          <Text>{product.count}</Text>
          <Ionicons name="add" style={styles.minus} />
        </View>
        <Text style={[styles.textBold, { textAlign: "right" }]}>
          {product.count * product.price} 원
        </Text>
      </View>
    </View>
  );
}
