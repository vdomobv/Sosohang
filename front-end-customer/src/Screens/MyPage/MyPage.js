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
import buyDummy from "../../Dummys/MyPage/BuyDummy";
import { useEffect, useState } from "react";

import { getDibData } from "../../Utils/DibAPI";
import Box from "../../Components/Box/Box";
import SectionSubtitle from "../../Components/SectionSubTitle/SectionSubTitle";

const user = userDummy;

export default function MyPage({ navigation }) {
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDibData(tempUser);
      setDibData(result);
    };

    fetchData();
  }, [dibData]);

  const [dibData, setDibData] = useState([]);
  const tempUser = 1;

  const dibs = dibData.length > 0 ? dibData.map((data, index) => {
    return <CarouselItem key={index} props={data.store}
      onPressFunction={() => {
        navigation.navigate('Shop', { data: data.store })
      }} />;
  }) :
    <Box customStyles={{ paddingHorizontal: 75, alignSelf: 'center' }} content={<SectionSubtitle content={"아직 찜한 상점이 없어요 :) "} />} />

  const buy = buyDummy.map((data, index) => {
    return <Gift navigation={navigation} key={index} data={data} />;
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
                navigation.navigate("Dibs");
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
