import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({navigation, content, bgcolor='#46C27D', fontcolor = 'black'}) {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor : bgcolor}]}>
        <Text style={[styles.content, {color : fontcolor}]}>{content}</Text>
      </TouchableOpacity>
    );
  }
  
  