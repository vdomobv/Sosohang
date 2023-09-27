import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

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

export default function Coupon({ navigation, data, storeName }) {
  const stampCount = data.length;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Stamp", {
          storeName: storeName,
          stampCount: stampCount,
          image: stampImages[stampCount],
        });
      }}
    >
      <View style={styles.header}>
        <SubTitle customStyles={{ margin: 10 }} subTitle={storeName} />
        <Text style={styles.count}>
          {data.length}
          <Text style={styles.total}> /10</Text>
        </Text>
      </View>

      <Image style={styles.image} source={stampImages[stampCount]} />
    </TouchableOpacity>
  );
}
