import styles from "./styles";
import { Text } from "react-native";

export default function SubTitle({ subTitle, customStyles }) {
  return (
    <Text style={[styles.subTitle, customStyles]}>{subTitle}</Text>
  );
}
