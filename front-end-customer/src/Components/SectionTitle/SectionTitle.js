import styles from "./styles";
import { Text } from "react-native";

export default function SectionTitle({ content, customStyles }) {
    return (
        <Text style={[styles.title, customStyles]}>
            {content}
        </Text>
    );
}
