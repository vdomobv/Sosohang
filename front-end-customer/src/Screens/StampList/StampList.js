import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Coupon from "../../Components/Coupon/Coupon";

import { useEffect, useState } from "react";
import axios from "axios";
import { customGroupBy } from "../../Utils/GroupBy";

export default function StampList({ navigation, route }) {
  const [userStamp, setUserStamp] = useState();
  const [userStampList, setUserStampList] = useState([]);
  const tempUser = route.params.tempUser;

  const getStampData = async () => {
    try {
      const response = await axios.get(
        `/api/v1/stamp/member/status?memberSeq=${tempUser}&stampStatus=0`
      );

      // console.log(response.data);

      const groupedData = customGroupBy(
        response.data,
        (item) => item.store.storeSeq
      );

      setUserStamp(groupedData);
      setUserStampList(Object.keys(groupedData));
    } catch (error) {
      // console.error("Error fetching store data in getStampData:", error);
    }
  };

  useEffect(() => {
    getStampData();
  }, [tempUser]);

  const stampData = userStampList.map((data, index) => {
    const storeName = userStamp[data][0].store.storeName
    return (
      <Coupon key={index} storeName={storeName} data={userStamp[data]} navigation={navigation} />
    );
  });
  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <ScrollBox content={stampData} />
      </View>
    </>
  );
}
