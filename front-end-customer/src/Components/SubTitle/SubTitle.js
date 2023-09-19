import styles from "./styles";
import { Text } from "react-native";

export default function SubTitle({ subTitle, fontcolor='black' }) {
  return (
    <Text style={[styles.subTitle, { color: fontcolor }]}>{subTitle}</Text>
  );
}
