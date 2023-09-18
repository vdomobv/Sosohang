import styles from "./styles";
import { View, Text, Image } from "react-native";


export default function Category({props}) {
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={props.image}
        />
      </View>
      <Text>{props.name}</Text>
    </View>
  );
}
