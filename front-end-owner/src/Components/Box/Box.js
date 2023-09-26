import styles from "./styles";
import { View } from "react-native";

export default function ScrollBox({ content }) {
  return <View style={styles.container}>{content}</View>;
}
