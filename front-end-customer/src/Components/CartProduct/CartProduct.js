import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function CartProduct({
  data,
  checked,
  onProductCheckChange,
}) {
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        value={checked}
        onValueChange={onProductCheckChange}
      />
      <Image style={{ flex: 2, marginRight: 10 }} source={require('assets/images/bread.png')}></Image>
      <View style={{ flex: 4 }}>
        <Text style={[styles.textBold, { marginTop: 5 }]}>{data.product.productName}</Text>
        <Text style={styles.price}>{data.product.productPrice} 원</Text>

        <View style={styles.counter}>
          <Ionicons
            name="remove-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              // TODO: Uncomment and fix this part
            }}
          />
          <Text style={styles.count}>{data.quantity}</Text>
          <Ionicons
            name="add-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
              // TODO: Uncomment and fix this part
            }}
          />
        </View>
        <Text style={[styles.textBold, { textAlign: "right", marginRight: 10 }]}>
          {data.quantity * data.product.productPrice} 원
        </Text>
      </View>
    </View>
  );
}
