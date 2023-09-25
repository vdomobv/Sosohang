import IMP from "iamport-react-native";
import styles from "./styles";
import { Image, View, Text } from "react-native";
import Loading from "../../Components/Loading/Loading";
import { EXPO_PG_USER_CODE } from "@env";
import { useEffect, useState } from "react";

export default function Payment({ navigation, route }) {
  const userCode = EXPO_PG_USER_CODE;
  const data = route.params.data;
  const [paymentResult, setPaymentResult] = useState();

  useEffect(() => {
    if (paymentResult) {
      navigation.navigate("PaymentResult", { data, paymentResult });
    }
  }, [paymentResult]);

  return (
    <View style={styles.container}>
      <IMP.Payment
        userCode={userCode}
        loading={<Loading />}
        data={data}
        callback={(response) => {
          console.log(response);
          setPaymentResult(response);
        }}
      />
    </View>
  );
}
