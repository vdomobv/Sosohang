import styles from "./styles";
import { ScrollView, Text, View } from "react-native";

import shopListDummy from "../../Dummys/Shop/ShopListDummy";

import Title from "../../Components/Title/Title";
import ListItem from "../../Components/ListItem/ListItem";
import Loading from "../../Components/Loading/Loading";

import { useState, useEffect } from "react";
import axios from "axios";

export default function List({ navigation, route }) {
  const category = route.params.category;
  const categorySeq = route.params.categorySeq;
  console.log(categorySeq);

  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://j9c109.p.ssafy.io:8081/api/v1/store/category/${categorySeq}`
        );
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getData();
  }, []);

  const shops = storeData.map((d, index) => {
    return (
      <ListItem
        PressFunction={() => {
          navigation.navigate("Shop");
        }}
        key={index}
        data={d}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Title title={category} />
      <ScrollView>{shops}</ScrollView>
    </View>
  );
}
