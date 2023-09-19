import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import Box from "../../Components/Box/Box";
import Coupon from "../../Components/Coupon/Coupon";

import StampListDummy from "../../Dummys/MyStamps/StampListDummy";

const stampList = StampListDummy.map((data) => {
  return <Coupon data={data} />;
});

export default function StampList({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <Box content={stampList} />
      </View>
    </>
  );
}
