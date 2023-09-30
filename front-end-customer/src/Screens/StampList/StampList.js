import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Coupon from "../../Components/Coupon/Coupon";

import { useEffect, useState } from "react";
import axios from "axios";
import { customGroupBy } from "../../Utils/GroupBy";

export default function StampList({ navigation }) {
  const tempUser = 1;
  const [userStamp, setUserStamp] = useState();
  const [userStampList, setUserStampList] = useState([]);

  const stampData = userStampList.map((data, index) => {
    console.log('test: ', userStamp[data]);
    return (
      <Coupon key={index} storeName={data} data={userStamp[data]} navigation={navigation} />
    );
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://j9c109.p.ssafy.io:8081/api/v1/stamp/${tempUser}`
        );

        const groupedData = customGroupBy(
          response.data,
          (item) => item.store.storeName
        );

        setUserStamp(groupedData);
        setUserStampList(Object.keys(groupedData));
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <ScrollBox content={stampData} />
      </View>
    </>
  );
}
