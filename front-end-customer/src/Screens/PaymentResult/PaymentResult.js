import { Image, View, Text } from "react-native";
import styles from "./styles";

import CustomButton from "../../Components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import SquareImage from "../../Components/SquareImage/SquareImage";
import Gift from "../../Components/Gift/Gift";
import Box from "../../Components/Box/Box";

export default function PaymentResult({ navigation, route }) {
  const paymentResult = route.params.paymentResult;
  const paymentData = route.params.paymentData;
  const data = route.params.data;
  const to = route.params.to;

  const gifts = Object.keys(data).map((shopName) => {
    const productsInShop = data[shopName][0];
    productsInShop["to"] = to;
    productsInShop["totalPrice"] = productsInShop.price * productsInShop.count;
    productsInShop["currentPrice"] =
      productsInShop.price * productsInShop.count;

    return (
      <Box
        key={shopName}
        content={<Gift data={productsInShop} key={shopName} />}
      />
    );
  });

  //   console.log("paymentResult : ", paymentResult, data, productList);
  return (
    <View style={styles.container}>
      <Title title={"결제 완료"} />
      <View style={styles.image}>
        <SquareImage imageSrc={require("assets/images/giftbox.gif")} />
      </View>
      {gifts}
      
      <View style={styles.button}>
        <CustomButton
          pressFuction={() => {
            navigation.navigate("MyPage");
          }}
          customStyles={{ justifyContent: "center", backgroundColor: "#E9EEE8"}}
          content={<Text style={styles.text}>결제 내역 보러가기</Text>}
          />
          </View>
      <View style={styles.button}>
        <CustomButton
          pressFuction={() => {
            navigation.navigate("YouAndMe");
          }}
          customStyles={{ justifyContent: "center" , backgroundColor: "#E9EEE8"}}
          content={<Text style={styles.text}>친구와 추억 보러가기</Text>}
          />
          </View>
    </View>
  );
}
