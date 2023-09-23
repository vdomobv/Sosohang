import styles from "./styles";
import { View, Text } from "react-native";

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
            <SquareImage imageSrc={data.image} />
            <View style={styles.content}>
                <SectionTitle content={data.name} />
                {data.productSale ? <Text style={styles.prevPrice}>{`${data.price}원`}</Text> : null}
                <SectionTitle content={`${data.productSale ? (1-data.productSale) * data.price : data.price}원`} customStyles={{ color: '#FF4646' }} />
                <View style={styles.amount}>
                    <Amount onCheckChange={(productAmount) => {
                        setproductAmount(productAmount);
                    }} productAmount={productAmount} />
                </View>
            </View>
        </View>
    );
}
