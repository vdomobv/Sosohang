import styles from "./styles";
import { Text } from "react-native";

export default function MyGift({ title }) {
  return (
      <Text style={styles.title}>{title}</Text>
  );
}
