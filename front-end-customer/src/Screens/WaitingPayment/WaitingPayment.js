import styles from "./styles";
import { Image, View, Text } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import SquareImage from "../../Components/SquareImage/SquareImage";

export default function WaitingPayment({ navigation, route }) {
  const [paymentResult, setPaymentResult] = useState(route.params.result);
  const totalPrice = route.params.totalPrice;
  const productList = route.params.groupedByStore;
  const to = route.params.to;
  const result = route.params.result;

  const storeNames = []
  for (let key in productList) {
    storeNames.push(productList[key][0].storeName)
  }

  const data = {
    pg: "tosspayments",
    pay_method: "card",
    merchant_uid: `product_${new Date().getTime()}`,
    name: `${storeNames.join(", ")}`,
    amount: totalPrice,
    currency: "KRW",
    language: "ko",
    buyer_tel: "010-1234-6789",
    app_scheme: "front-end-customer",
  };

  useEffect(() => {
    if (!paymentResult) {
      console.log("before navigate", productList);
      navigation.navigate("Payment", { data, productList, to });
    } else {
      navigation.goback();
    }
  }, [paymentResult]);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <SquareImage imageSrc={require("assets/images/giftbox.gif")} />
      </View>
      <View style={styles.button}>
        <CustomButton
          pressFuction={() => {
            navigation.navigate("Payment", { data, to });
          }}
          customStyles={{ justifyContent: "center" }}
          content={<Text style={styles.text}>결제하기</Text>}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>결제 중 취소하셨다면</Text>
        <Text style={styles.infoText}>
          위 버튼을 통해 다시 결제를 진행하실 수 있습니다.
        </Text>
      </View>
    </View>
  );
}
