import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default function HashTag({props, pressFucntion}) {
    return (
      <TouchableOpacity onPress={pressFucntion} style={styles.container}>
        <Text># {props.keywordName}</Text>
      </TouchableOpacity>
    );
  }
  
  