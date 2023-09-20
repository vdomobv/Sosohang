import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import CustomSearchBar from "../../Components/CustomSearchBar/CustomSearchBar";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";

export default function PurchageHistory({ navigation, route }) {
  const buyList = route.params.buy || {};
  // console.log(buyList);
  return (
    <View style={styles.container}>
      <Title title={"구매내역"} />
      <CustomSearchBar placeholderText={"친구의 이름이나 번호를 검색하세요."} />
      <ScrollBox
        content={buyList.map((d, index) => {
          return <Gift key={index} data={d} />;
        })}
      />
    </View>
  );
}
