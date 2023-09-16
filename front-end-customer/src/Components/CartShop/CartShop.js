import { useState } from "react";

import styles from "./styles";
import { View, Text } from "react-native";
import Checkbox from 'expo-checkbox';
import { Ionicons } from "@expo/vector-icons";

import Product from "../Product/Product";

export default function CartShop({data}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.shopName}> <Checkbox style={styles.checkbox}
          value={isChecked}
          onValueChange={() => setIsChecked(!isChecked)}
          color={isChecked ? '#4630EB' : undefined} />   {data.name}   <Ionicons name="home-outline" /></Text>
        <View style={styles.products}>
          {
            data.products.map( d => {
              return <Product product = {d}/>
            })
          }
        </View>
      </View>
    </View>
  );
}

