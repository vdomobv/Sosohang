import styles from "./styles";
import { View, Text, Image } from "react-native";

import SubTitle from "../SubTitle/SubTitle";

const stampImages = {
  1: require("assets/images/stamp1.png"),
  2: require("assets/images/stamp2.png"),
  3: require("assets/images/stamp3.png"),
  4: require("assets/images/stamp4.png"),
  5: require("assets/images/stamp5.png"),
  6: require("assets/images/stamp6.png"),
  7: require("assets/images/stamp7.png"),
  8: require("assets/images/stamp8.png"),
  9: require("assets/images/stamp9.png"),
  10: require("assets/images/stamp10.png"),
};

export default function Coupon({ navigation, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SubTitle subTitle={data.shopname} />
        <Text style={styles.count}>
          {data.stamp}
          <Text style={styles.total}> /10</Text>
        </Text>
      </View>

      <Image style={styles.image} source={stampImages[data.stamp]} />
    </View>
  );
}
