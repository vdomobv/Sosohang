import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import SectionSubTitle from '../SectionSubTitle/SectionSubTitle';
import SectionTitle from "../SectionTitle/SectionTitle";

export default function Amount({ productAmount, onCheckChange }) {
    const [amount, setAmount] = useState(productAmount);

    useEffect(() => {
        onCheckChange(amount);
    }, [amount])

    return <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            if (amount > 1) {
                setAmount(amount - 1);
            }
        }}>
            <SectionTitle content={"─"} />
        </TouchableOpacity>
        <SectionSubTitle content={amount} />
        <TouchableOpacity onPress={() => {
            setAmount(amount + 1);
        }}>
            <SectionTitle content={"┼"} />
        </TouchableOpacity>
    </View>;
}
