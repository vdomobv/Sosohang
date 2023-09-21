import styles from "./styles";
import { View, Text, Image } from "react-native";


export default function YouList({ props }) {

  return (
    <View style={styles.container}>
      <View style={styles.youContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('assets/images/bread.png')}
            // source={props.image}
          />
        </View>
        {/* <Text style={styles.name}>친구 이름</Text> */}
        <Text style={styles.name}>{props.name}</Text>
      </View>
    </View>
  );
}
