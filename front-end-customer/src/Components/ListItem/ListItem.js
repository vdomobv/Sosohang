import styles from "./styles";
import { View } from "react-native";
import SquareImage from "../SquareImage/SquareImage"

export default function ShopListItem({ data }) {
    return <View style={styles.container}>
        <SquareImage imageSrc={data.imageSrc}/>
    </View>;
}
