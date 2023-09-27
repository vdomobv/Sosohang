import styles from "./styles";
import { View } from "react-native";

export default function Box({ content }) {
  return <View style={styles.container}>{content}</View>;
}
