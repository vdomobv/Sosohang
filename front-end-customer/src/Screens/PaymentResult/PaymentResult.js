import { Image, View, Text } from "react-native";
import styles from "./styles";

import CustomButton from "../../Components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import SubTitle from "../../Components/SubTitle/SubTitle";

export default function PaymentResult({ navigation, route }) {
  const paymentResult = route.params.paymentResult;
  const data = route.params.data;

  console.log(paymentResult, data)

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={require("assets/images/giftbox.gif")} />
      </View>
      <SubTitle subTitle={"결제완료"} />
    </View>
  );
}
