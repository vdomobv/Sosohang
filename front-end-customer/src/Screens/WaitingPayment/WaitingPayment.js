import styles from "./styles";
import { Image, View, Text } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton"
import { useEffect, useState } from "react";


export default function WaitingPayment({ navigation, route }) {
    const [paymentResult, setPaymentResult] = useState(route.params.result);
    const totalPrice = route.params.totalPrice;
    const productList = route.params.groupedProducts;
    const groupedName = Object.keys(productList);
    const data = {
        pg: "tosspayments",
    pay_method: "card",
    merchant_uid: "test_lmxisn7n",
    name: "선물꾸러미",
    amount: 42000,
    currency: "KRW",
    language: "ko",
    buyer_tel: "010-1234-6789",
    app_scheme : "front-end-customer"
    }

    useState(() => {
        if (!paymentResult) {
            navigation.navigate('Payment', { data })
        }
    }, [paymentResult])

    return <View style={styles.container}>
        <View style={styles.image}>
            <Image source={require('assets/images/giftbox.gif')} />
        </View>
        <View style={styles.button}>
            <CustomButton customStyles={{ justifyContent: 'center' }} content={<Text style={styles.text}>결제 완료</Text>} />
        </View>
    </View>;
}
