import styles from "./styles";
import React from "react";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import GiftCardBackground from "../../Components/GiftCardBackground/GiftCardBackground";

export default function MyGiftDetail({ route, navigation }) {
  const giftData = route.params.giftData;

  const content = {
    cardImage: "박스 1 카드이미지",
    cardMessage: "박스 2 카드메시지",
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"받은 선물함"}></Title>
        <ScrollBox
          content={
            <View>
            <Gift data={giftData} />
            <View style={styles.subContainer}>
              <GiftCardBackground content={content}/>
            </View>
            </View>

          }
        />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}