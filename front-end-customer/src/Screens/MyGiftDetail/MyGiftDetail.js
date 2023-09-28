import styles from "./styles";
import React from "react";
import { ScrollView, View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import GiftCardBackground from "../../Components/GiftCardBackground/GiftCardBackground";

export default function MyGiftDetail({ route, navigation }) {
  const { giftData } = route.params;

  const content = {
    cardImage: giftData.cardImage,
    cardMessage: giftData.message,
    cardQr: giftData.qrImage,
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"받은 선물"}></Title>
        <ScrollBox style={styles.scrollBoxContainer}
          content={
            <>
              <Box content={<Gift data={giftData} />} />
              <GiftCardBackground content={content} />
            </>
          } />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}