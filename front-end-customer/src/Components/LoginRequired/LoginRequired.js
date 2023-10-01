import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

import SubTitle from "../SubTitle/SubTitle"
import CustomButton from "../CustomButton/CustomButton"

export default function LoginRequired({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require("assets/images/sosohang_favicon.png")}
      /> */}
      <SubTitle subTitle={"로그인이 필요한 페이지입니다."} />
      <View style={styles.button}>
        <CustomButton pressFuction={() => {navigation.navigate('SignUp')}} content={'로그인하러 가기'} />
      </View>
    </View>
  );
}
