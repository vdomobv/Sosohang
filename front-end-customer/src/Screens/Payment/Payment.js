import IMP from "iamport-react-native";
import styles from "./styles";
import { Image, View, Text } from "react-native";
import Loading from "../../Components/Loading/Loading";
import { EXPO_PG_USER_CODE } from "@env";
import { useEffect, useState } from "react";

export default function Payment({ navigation, route }) {
  const userCode = EXPO_PG_USER_CODE;
  const data = route.params.data;
  const productList = route.params.productList;
  const to = route.params.to;
  const [paymentResult, setPaymentResult] = useState();
  const [gotoResult, setGoToResult] = useState(false);

  useEffect(() => {
    if (gotoResult) {
      navigation.navigate("PaymentResult", {
        paymentData: data,
        paymentResult,
        data: productList,
        to : to,
      });
    }
  }, [paymentResult]);

  return (
    <View style={styles.container}>
      <IMP.Payment
        userCode={userCode}
        loading={<Loading />}
        data={data}
        callback={(response) => {
          console.log("response : ", response);
          console.log("data : ", productList);
          setGoToResult(true);
          setPaymentResult(response);
        }}
      />
    </View>
  );
}
