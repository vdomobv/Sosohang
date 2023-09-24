import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

import SubTitle from "../SubTitle/SubTitle"

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("assets/images/sosohang_favicon.png")}
      />
      <SubTitle subTitle={"로딩중"} />
    </View>
  );
}
