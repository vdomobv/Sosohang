import styles from "./styles";
import { Image, View, Text } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton"
import { useEffect } from "react";


export default function ScrollBox({ content }) {
    useEffect(() => {
        
    }, [])

    return <View style={styles.container}>
        <View style={styles.image}>
            <Image source={require('assets/images/giftbox.gif')} />
        </View>
        <View style={styles.button}>
            <CustomButton customStyles={{ justifyContent: 'center' }} content={<Text style={styles.text}>결제 완료</Text>} />
        </View>
    </View>;
}
