import styles from "./styles";
import React from "react";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";

export default function MyGiftDetail({ route, navigation }) {
  const giftData = route.params.giftData;

  return (
    <>
      <View style={styles.container}>
        <Title title={"받은 선물함"}></Title>
        <Text>{giftData.from}</Text>
        <Text>{giftData.name}</Text>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}