import styles from "./styles";
import { View, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";

import MyGiftDummy from "../../Dummys/MyGift/MyGiftDummy";
// const dummy = MyGiftDummy;

export default function MyGift({ navigation }) {

  const handleGiftClick = (giftData) => {
    // Gift 컴포넌트를 클릭했을 때 호출될 함수
    navigation.navigate("MyGiftDetail", { giftData }); // MyGiftDetail로 이동하고 giftData 전달
  };

  const gifts = MyGiftDummy.map((d, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleGiftClick(d)}>
        <Gift data={d} />
      </TouchableOpacity>
    );
  });

  return (
    <>
      <View style={styles.container}>
        <Title title={"받은 선물함"}></Title>
        <ScrollBox content={gifts}/>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}