import styles from "./styles";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import Tabs from "../../Components/Tabs/Tabs";

import MyGiftDummy from "../../Dummys/MyGift/MyGiftDummy";
const dummy = MyGiftDummy;

export default function MyGift({ navigation }) {
  const [activatedTab, setActivatedTab] = useState(true)

  const handleGiftClick = (giftData) => {
    navigation.navigate("MyGiftDetail", { giftData }); 
  };

  const usableGifts = dummy.filter((d) => d.price > 0 === true).map((d, index) => {
    return <Gift onPress={() => handleGiftClick(d)} data={d} key={index} usable={true} />;
  });
  const unusableGifts = dummy.filter((d) => d.price == 0 === true).map((d, index) => {
    return <Gift onPress={() => handleGiftClick(d)} data={d} key={index} usable={false}/>;
  })

return (
  <>
    <View style={styles.container}>
      <Title title={"받은 선물함"}></Title>
      <View style={styles.giftTabs}>
        <TouchableOpacity onPress={() => {
          if (!activatedTab) {
            setActivatedTab(!activatedTab)
          }
        }} style={[activatedTab ? styles.tab : styles.deactivated]}>
          <SubTitle subTitle={'사용가능'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (activatedTab) {
            setActivatedTab(!activatedTab)
          }
        }} style={[!activatedTab ? styles.tab : styles.deactivated]}>
          <SubTitle subTitle={'사용완료'} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabPage}>
        <ScrollBox content={
          activatedTab ? usableGifts : unusableGifts
        } />
      </View>
    </View>
    <Tabs navigation={navigation} />
  </>
);
}