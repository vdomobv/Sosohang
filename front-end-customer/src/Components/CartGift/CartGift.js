import { useEffect, useState } from "react";

import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function CartGift({
  product,
  setSelectedProducts,
}) {
  const [productCount, setProductCount] = useState(product.count);

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
      <Image style={{ flex: 2 }} source={product.productImage}></Image>
      <View style={{ flex: 4 }}>
        <Text style={styles.textBold}>{product.productName}</Text>
        <Text>{product.productPrice} 원</Text>
        <Text>{productCount} 개</Text>
        <Text style={[styles.textBold, { textAlign: "right" }]}>
          {productCount * product.productPrice} 원
        </Text>
      </View>
    </View>
  );
}
