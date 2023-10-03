import styles from "./styles";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../../Components/Title/Title";
// import CustomSearchBar from "../../Components/CustomSearchBar/CustomSearchBar";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import Store from"../../Components/Store/Store";

export default function PurchaseHistory({ data }) {
  const navigation = useNavigation();

  // storeSeq를 기준으로 데이터 그룹화
  const groupedByStoreSeq = data.reduce((acc, order) => {
    if (!acc[order.storeSeq]) {
      acc[order.storeSeq] = [];
    }
    acc[order.storeSeq].push(order);
    return acc;
  }, {});

  // 그룹화된 데이터의 키를 내림차순으로 정렬
  const sortedStoreKeys = Object.keys(groupedByStoreSeq).sort((a, b) => b - a);

  // 내림차순으로 정렬된 키를 사용하여 그룹화된 데이터를 배열로 변환
  const groupedStoreArray = sortedStoreKeys.map(
    (key) => groupedByStoreSeq[key]
  );

  const store = groupedStoreArray.map((data, index) => {
    return <Store navigation={navigation} key={index} data={data} />;
  });

  return (
    <View style={styles.container}>
      <Text style={{fontSize : 18, marginBottom: 8, marginLeft: 10,}}>{new Date(data[0].createdDate).toLocaleString()}</Text>
      {/* <Text style={{fontSize : 18, marginBottom: 8, marginLeft: 10, fontWeight : "bold"}}>TO : {data.toName} </Text> */}
      <ScrollBox
        content={store}
      />
    </View>
  );
}
