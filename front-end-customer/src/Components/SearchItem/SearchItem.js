import styles from "./styles";
import { View, Text } from "react-native";

export default function SearchItem({ content }) {
  return (
    <View style={styles.container}>
      <Text>{content}</Text>
    </View>
  );
}
