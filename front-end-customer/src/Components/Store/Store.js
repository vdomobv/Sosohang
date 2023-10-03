import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Store({ data, usable, onPress }) {
  const productList = data.map((order) => order.product.productName);

  const totalOrderPrice = data.reduce(
    (total, order) => total + order.orderPrice,
    0
  );

  return (
    <>
      <View
        style={{
          height: "auto",
          padding: 8,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* data[0].product.store.storeImage로 source 바꿔보기 */}

        <Image
          style={{ height: 120, width: 120, borderRadius: 10 }}
          source={require("assets/dummyimages/anuek.jpg")}
        ></Image>

        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {data[0].product.store.storeName}
          </Text>

          {productList.map((product, index) => (
            <Text key={index} style={{ fontSize: 18 }}>
              {product}
            </Text>
          ))}

          <Text style={{ marginTop: 2, fontSize: 18, fontWeight: "bold"}}>
            결제 금액: {totalOrderPrice} 원
          </Text>
        </View>
      </View>
    </>
  );
}
