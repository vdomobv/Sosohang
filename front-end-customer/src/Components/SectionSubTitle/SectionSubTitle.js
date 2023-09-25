import styles from "./styles";
import { Text } from "react-native";

export default function SectionSubTitle({ content }) {
    return (
        <Text style={styles.title}>
            {content}
        </Text>
    );
}
