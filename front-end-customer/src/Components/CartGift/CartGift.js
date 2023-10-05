import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function CartGift({
  product,
  setSelectedProducts,
}) {
  const [productCount, setProductCount] = useState(product.count);
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    setSelectedProducts((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(product);
      return newSet;
    });
  }
  );

  return (
    <View style={styles.container}>
      <Image style={{ flex: 2, borderRadius : 10, marginRight:10 }} src={product.productImage}></Image>
      <View style={{ flex: 4 }}>
        <Text style={styles.textBold}>{product.productName}</Text>
        <Text style={styles.textSamll}>{numberWithCommas((product.productPrice * (1- product.productDcrate)))} 원</Text>
        <Text style={styles.textSamll}>{productCount} 개</Text>
        <Text style={[styles.textBold, { textAlign: "right" }]}>
          {numberWithCommas(productCount * product.productPrice * (1- product.productDcrate))} 원
        </Text>
      </View>
    </View>
  );
}
