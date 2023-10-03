import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
// import CustomSearchBar from "../../Components/CustomSearchBar/CustomSearchBar";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";

export default function PurchaseHistory({ navigation, route }) {
  const buyList = route.params.buy || {};
  console.log(buyList);
  return (
    <View style={styles.container}>
      <Title title={"구매내역"} />
      <ScrollBox
        content={buyList.map((d, index) => {
          return <Gift key={index} data={d} />;
        })}
      />
    </View>
  );
}
