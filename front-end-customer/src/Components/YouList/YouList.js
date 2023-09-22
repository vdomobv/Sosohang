import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function YouList({ props }) {

  return (
    <View style={styles.container}>
      <View style={styles.youContainer}>
          <Image
            style={styles.image}
            source={require('assets/images/bread.png')}
          // source={props.image}
          />
        {/* MyPage/BuyDummy/to:"이름" */}
          <Text style={styles.name}>{props.to}</Text>
      </View>
    </View>
  );
}
