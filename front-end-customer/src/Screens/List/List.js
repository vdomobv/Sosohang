import styles from "./styles";
import { View } from "react-native";

import Title from "../../Components/Title/Title";
import Shop from "../../Components/Shop/Shop";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Tabs from "../../Components/Tabs/Tabs";

import { useState, useEffect } from "react";
import { getMemberSeq } from "../../Utils/MemberAPI"
import axios from "axios";

export default function List({ navigation, route }) {
  const category = route.params.category;
  const categorySeq = route.params.categorySeq;
  const [tempUser, setTempUser] = useState();
  const [storeData, setStoreData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://j9c109.p.ssafy.io/api/v1/store/category/${categorySeq}`
      );
      setStoreData(response.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      const result = await getMemberSeq();
      if (result !== undefined) {
        setTempUser(result);
      }
    };

    fetchData();
  }, []);

  const shops = storeData.map((d, index) => {
    return (
      <Shop
        PressFunction={() => {
          navigation.navigate("Shop", { storeSeq: d.storeSeq, storeImage: d.storeImage });
        }}
        key={index}
        data={d}
        tempUser={tempUser}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Title title={category} />
      <ScrollBox content={shops} />
      <Tabs navigation={navigation} />
    </View>
  );
}
