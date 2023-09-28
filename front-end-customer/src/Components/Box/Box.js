import styles from "./styles";
import { View } from "react-native";

export default function Box({ content, customStyles }) {
  return <View style={[styles.container, customStyles]}>{content}</View>;
}
