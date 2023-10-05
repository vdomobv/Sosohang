import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import SectionSubTitle from '../SectionSubTitle/SectionSubTitle';

export default function Amount({ productAmount, onCheckChange }) {
    const [amount, setAmount] = useState(productAmount);

    useEffect(() => {
        setAmount(productAmount);
    }, [productAmount])

    useEffect(() => {
        onCheckChange(amount);
    }, [amount])

    return <View style={styles.container}>
        <Ionicons
            name="remove-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
                if (amount > 1) {
                    setAmount(amount - 1);
                }
            }} />
        <SectionSubTitle content={amount} />
        <Ionicons
            name="add-circle-outline"
            style={styles.circleIcon}
            onPress={() => {
                setAmount(amount + 1);
            }} />
    </View>;
}
