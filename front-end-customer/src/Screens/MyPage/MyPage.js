import styles from "./styles";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Line from "../../Components/Line/Line";
import SubTitle from "../../Components/SubTitle/SubTitle";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import Carousel from "../../Components/Carousel/Carousel";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import StampAfter from "../../Components/StampAfter/StampAfter";

import userDummy from "../../Dummys/MyPage/UserDummy";
import dibsDummy from "../../Dummys/MyPage/DibsDummy";
import buyDummy from "../../Dummys/MyPage/BuyDummy";
import axios from 'axios'
import { useEffect, useState } from "react";


const user = userDummy;

export default function MyPage({ navigation }) {
  // const dibs = dibsDummy.map((data, index) => {
  //   return <CarouselItem key={index} props={data} />;
  // });

  const buy = buyDummy.map((data, index) => {
    return <Gift navigation={navigation} key={index} data={data} />;
  });

  const [dibData, setDibData] = useState([]);
  const tempUser = 1;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://j9c109.p.ssafy.io:8081/api/v1/dib/${tempUser}`
        );
        setDibData(response.data);
        console.log(Array.isArray(response.data));
        console.log(response.data[0].store);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    getData();
  }, []);

  const dibs = dibData.map((data, index) => {
    return <CarouselItem key={index} props={data.store}
    onPressFunction={() => {
      navigation.navigate('Shop', { data : data.store })
    }}/>;
  });
  return (
    <>
      <ScrollView style={styles.container}>
        <Title title={"나의 소소행"} />

        <View style={styles.section1}>
          <View style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={require("assets/images/bread.png")}
            />
            <View style={styles.user}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text
                  onPress={() => {
                    console.log("이름 수정");
                  }}
                >
                  {" "}
                  ✏️
                </Text>
              </View>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("StampList");
            }}
          >
            <StampAfter />
          </TouchableOpacity>
        </View>

        <Line />

        <View style={styles.section2}>
          <View style={styles.header}>
            <SubTitle
              customStyles={{ marginVertical: 10 }}
              subTitle={"❤️ 찜 목록"}
            />
            <Text
              onPress={() => {
                navigation.navigate("Dibs", { dibs: dibsDummy });
              }}
            >
              상세보기 ＞{" "}
            </Text>
          </View>
          <Carousel content={dibs} />
        </View>

        <Line />

        <View style={styles.section3}>
          <View style={styles.header}>
            <SubTitle
              customStyles={{ marginVertical: 10 }}
              subTitle={"💸 구매 내역"}
            />
            <Text
              onPress={() => {
                navigation.navigate("PurchaseHistory", {
                  buy: buyDummy,
                });
              }}
            >
              상세보기 ＞{" "}
            </Text>
          </View>
          <ScrollBox content={buy} />
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}
