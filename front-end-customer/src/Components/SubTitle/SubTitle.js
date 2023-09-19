import styles from "./styles";
import { Text } from "react-native";

export default function SubTitle({ subTitle }) {
  return (
      <Text style={styles.subTitle}>{subTitle}</Text>
  );
}
