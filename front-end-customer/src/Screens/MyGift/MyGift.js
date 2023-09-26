import styles from "./styles";
import { View, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";

import MyGiftDummy from "../../Dummys/MyGift/MyGiftDummy";

import SubTitle from "../../Components/SubTitle/SubTitle";
import { useState } from "react";
const dummy = MyGiftDummy;

export default function MyGift({ navigation }) {
  const [activatedTab, setActivatedTab] = useState(true)

  const usableGifts = dummy.filter((d) => d.price > 0 === true).map((d, index) => {
    return <Gift onPress={() => handleGiftClick(d)} data={d} key={index} />;
  });
  const unusableGifts = dummy.filter((d) => d.price == 0 === true).map((d, index) => {
    return <Gift onPress={() => handleGiftClick(d)} data={d} key={index} />;
  })

  const handleGiftClick = (giftData) => {
    // Gift 컴포넌트를 클릭했을 때 호출될 함수
    navigation.navigate("MyGiftDetail", { giftData }); // MyGiftDetail로 이동하고 giftData 전달
  };

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