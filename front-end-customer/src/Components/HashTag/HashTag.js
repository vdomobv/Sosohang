import styles from "./styles";
import { View, Text } from "react-native";

export default function HashTag({props}) {
    return (
      <View style={styles.container}>
        <Text>{props.name}</Text>
      </View>
    );
  }
  
  