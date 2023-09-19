import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Coupon from "../../Components/Coupon/Coupon";

import StampListDummy from "../../Dummys/MyStamps/StampListDummy";

export default function StampList({ navigation }) {
  const stampList = StampListDummy.map((data) => {
    return <Coupon data={data} navigation={navigation} />;
  });

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <ScrollBox content={stampList} />
      </View>
    </>
  );
}
