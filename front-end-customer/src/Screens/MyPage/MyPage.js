import styles from "./styles";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";
import Title from "../../Components/Title/Title";
import Line from "../../Components/Line/Line";
import SubTitle from "../../Components/SubTitle/SubTitle";
import CarouselItem from "../../Components/CarouselItem/CarouselItem";
import Carousel from "../../Components/Carousel/Carousel";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Gift from "../../Components/Gift/Gift";
import StampAfter from "../../Components/StampAfter/StampAfter";
import Box from "../../Components/Box/Box";
import SectionSubtitle from "../../Components/SectionSubTitle/SectionSubTitle";
import Loading from "../../Components/Loading/Loading";

import userDummy from "../../Dummys/MyPage/UserDummy";
import buyDummy from "../../Dummys/MyPage/BuyDummy";

import { useEffect, useState } from "react";
import { getDibData } from "../../Utils/DibAPI";
import { logout, getMemberSeq, getMemberData, updateMemberNickname } from "../../Utils/MemberAPI";
import LoginRequired from "../../Components/LoginRequired/LoginRequired";

export default function MyPage({ navigation }) {
  const [tempUser, setTempUser] = useState();
  const [dibData, setDibData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({})
  const [updating, setUpdating] = useState(false);
  const [newMemberNickname, setNewMemberNickname] = useState('');

  const fetchData = async () => {
    const memberSeq = await getMemberSeq();
    if (memberSeq !== undefined) {
      setTempUser(memberSeq);
    }
  };

  useEffect(() => {
    if (tempUser !== undefined) {
      fetchMemberData();
    }
    setLoading(false);

  }, [tempUser]);

  const fetchMemberData = async () => {
    const result = await getDibData(tempUser);
    setDibData(result);
    const userResult = await getMemberData(tempUser);
    setUserData(userResult);
  };

  // 로그인 여부 가져오기
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);


  // 찜 데이터 변경 시, 업데이트
  useEffect(() => {
    if (tempUser !== undefined) {
      fetchMemberData();
    }
  }, [dibData]);

  useEffect(() => {
    // console.log(newMemberNickname)
  }, [newMemberNickname])

  const dibs = dibData && dibData.length > 0 ? dibData.map((data, index) => {
    return <CarouselItem key={index} props={data.store}
      onPressFunction={() => {
        navigation.navigate('Shop', { data: data.store })
      }} />;
  }) :
    <Box customStyles={{ paddingHorizontal: 75, alignSelf: 'center' }} content={<SectionSubtitle content={"아직 찜한 상점이 없어요 :) "} />} />

  const buy = buyDummy.map((data, index) => {
    return <Gift navigation={navigation} key={index} data={data} />;
  });

  if (loading) {
    return <Loading />
  } else if (tempUser) {
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
                <TouchableOpacity onPress={() => {
                  // console.log('이름 바꾸기')
                  setUpdating(true)
                }} style={{ flexDirection: "row" }}>
                  {
                    updating &&
                    <TextInput onSubmitEditing={() => {
                      updateMemberNickname(tempUser, newMemberNickname)
                      setUpdating(false)
                    }}
                      value={newMemberNickname}
                      onChangeText={(text) => { setNewMemberNickname(text) }}
                      style={styles.updateNickname}
                      placeholder={userData.memberNickname} />
                  }
                  {!updating &&
                    <Text style={styles.name}>{userData.memberNickname}</Text>}

                  <Text
                  >
                    {" "}
                    ✏️
                  </Text>
                </TouchableOpacity>
                <Text style={styles.phone}>{userData.memberPhone}</Text>
                <TouchableOpacity onPress={() => {
                  logout()
                  console.log("로그아웃 되었습니다.")
                }}>
                  <Text style={styles.logout}>로그아웃 하기</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("StampList", { tempUser });
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
  } else {
    return (
      <LoginRequired navigation={navigation} />
    )
  }
}
