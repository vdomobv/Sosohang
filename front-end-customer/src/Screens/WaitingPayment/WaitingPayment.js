import styles from "./styles";
import { Image, View, Text } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton"
import { useEffect, useState } from "react";


export default function WaitingPayment({ navigation, route }) {
    const [paymentResult, setPaymentResult] = useState(route.params.result);
    const totalPrice = route.params.totalPrice;
    const productList = route.params.groupedProducts;
    const to = route.params.to;
//   console.log('name : ',to)

    const groupedName = Object.keys(productList);
    const data = {
        pg: "tosspayments",
        pay_method: "card",
        merchant_uid: `test_${new Date().getTime()}`,
        name: `${groupedName.join(", ")}`,
        amount: totalPrice,
        currency: "KRW",
        language: "ko",
        buyer_tel: "010-1234-6789",
        app_scheme: "front-end-customer"
    }

    useEffect(() => {
        if (!paymentResult) {
            console.log('befor navigate', productList);
            navigation.navigate('Payment', { data, productList, to })
        }
    }, [paymentResult])

    return <View style={styles.container}>
        <View style={styles.image}>
            <Image source={require('assets/images/giftbox.gif')} />
        </View>
        <View style={styles.button}>
            <CustomButton pressFuction={navigation.navigate('Payment', {data, to})} customStyles={{ justifyContent: 'center' }} content={<Text style={styles.text}>결제하기</Text>} />
        </View>
    </View>;
}
