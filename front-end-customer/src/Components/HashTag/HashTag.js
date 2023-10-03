import styles from "./styles";
import { Text, TouchableOpacity } from "react-native";

export default function HashTag({ props, pressFucntion, selectedKeyword }) {
  return (
    <TouchableOpacity onPress={pressFucntion} style={[styles.container, selectedKeyword == props.keywordSeq ? { backgroundColor: '#E6FEDA' } : undefined]}>
      <Text># {props.keywordName}</Text>
    </TouchableOpacity>
  );
}

