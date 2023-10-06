import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";


export default function Category({props, PressFunction}) {
  
  return (
    <TouchableOpacity onPress={PressFunction} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={props.image}
        />
      </View>
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
}
