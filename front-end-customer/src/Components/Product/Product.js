import styles from "./styles";
import { View } from "react-native";

import SquareImage from "../SquareImage/SquareImage"
import SectionTitle from "../SectionTitle/SectionTitle";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import Amount from "../Amount/Amount";

export default function Product({ data, checked, amount, onCheckChange, onAmountChange }) {
    const [isChecked, setIsChecked] = useState(checked);
    const [productAmount, setproductAmount] = useState(amount);

    useEffect(() => {
        onAmountChange(productAmount);
    }, [productAmount])

    useEffect(() => {
        onCheckChange(isChecked);
    }, [isChecked])

    return (
        <View style={styles.container}>
            <Checkbox style={styles.checkbox}
                value={isChecked}
                onValueChange={() => {
                    setIsChecked(!isChecked);
                    onCheckChange(isChecked);
                }} />
            <SquareImage imageSrc={data.imageSrc} />
            <View style={styles.content}>
                <SectionTitle content={data.productName} />
                <SectionTitle content={`${data.productPrice}원`} customStyles={{ color: '#FF4646' }} />
                <View style={styles.amount}>
                    <Amount onCheckChange={(productAmount) => {
                        setproductAmount(productAmount);
                    }} productAmount={productAmount} />
                </View>
            </View>
        </View>
    );
}
