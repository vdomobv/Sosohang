import styles from "./styles";
import { View, Text } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";

import MyGiftDummy from "../../Dummys/MyGift/MyGiftDummy";
const dummy = MyGiftDummy;

export default function MyGift({ navigation }) {
  const gifts = dummy.map((d, index) => {
    return <Gift data={d} key={index} />;
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