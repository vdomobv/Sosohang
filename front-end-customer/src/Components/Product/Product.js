import styles from "./styles";
import { Text } from "react-native";

import SqureImage from "../SquareImage/SqureImage"
import SectionTitle from "../SectionTitle/SectionTitle";

export default function Product({ data }) {
    return (
        <View style={styles.container}>
            <SqureImage imageSrc={data.imageSrc} />
            <View>
                <Text style={styles.title}>{title}</Text>
                <SectionTitle content={data.productName} />
                <SectionTitle content={data.productPrice} customStyles={{ color: '#FF4646' }} />
            </View>
        </View>
    );
}
