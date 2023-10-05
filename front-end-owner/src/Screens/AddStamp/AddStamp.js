// components
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import axios from "axios";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Box from "../../Components/Box/Box";
import PlusMinusModal from "../../Components/PlusMinusModal/PlusMinusModal";
import Tabs from "../../Components/Tabs/Tabs";

export default function AddStamp({ route, navigation }) {
  const { stampData } = route.params;
  console.log(stampData);
  const [modalVisible, setModalVisible] = useState(false);
  const [stampCount, setStampCount] = useState(1);
  const [nowStamp, setNowStamp] = useState(stampData.length);
  const [stampImages, setStampImages] = useState({
    1: require("assets/images/stamp1.png"),
    2: require("assets/images/stamp2.png"),
    3: require("assets/images/stamp3.png"),
    4: require("assets/images/stamp4.png"),
    5: require("assets/images/stamp5.png"),
    6: require("assets/images/stamp6.png"),
    7: require("assets/images/stamp7.png"),
    8: require("assets/images/stamp8.png"),
    9: require("assets/images/stamp9.png"),
    10: require("assets/images/stamp10.png"),
  });

  useEffect(() => {
    setStampImages({
      1: require("assets/images/stamp1.png"),
      2: require("assets/images/stamp2.png"),
      3: require("assets/images/stamp3.png"),
      4: require("assets/images/stamp4.png"),
      5: require("assets/images/stamp5.png"),
      6: require("assets/images/stamp6.png"),
      7: require("assets/images/stamp7.png"),
      8: require("assets/images/stamp8.png"),
      9: require("assets/images/stamp9.png"),
      10: require("assets/images/stamp10.png"),
    });
  }, [nowStamp]);

  const storeSeq = stampData[0].store.storeSeq;
  const phoneNumber = stampData[0].member.memberPhone;

  const incrementStampCount = () => {
    if (stampCount < 10) {
      setStampCount(stampCount + 1);
    }
  };

  const decrementStampCount = () => {
    if (stampCount > 1) {
      setStampCount(stampCount - 1);
    }
  };

  const handlePress = async (count) => {
    try {
      const response = await axios.post(
        `https://j9c109.p.ssafy.io/api/v1/stamp/earn?storeSeq=${storeSeq}&memberPhone=${phoneNumber}&stampCount=${count}`
      );

      const { data } = response;

      if (data) {
        setModalVisible(false);

        const updatedStamp = nowStamp + count;
        setNowStamp(updatedStamp);
      } else {
        Alert.alert("알림", "정보가 없습니다.");
      }
    } catch (error) {
      setModalVisible(false);
    }
  };

  const handleStamp = () => {
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <View style={styles.subtitle}>
          {/* 상점 이름 */}
          <Title title={stampData[0].store.storeName} />
        </View>
        <Box
          content={
            <View style={styles.stampBox}>
              <SubTitle
                subTitle={"현재 적립 소복소복"}
                customStyles={{ color: "#FFBF46" }}
              />
              <Text style={styles.stampNow}>
                {/* 현재 스탬프 */}
                {nowStamp}
                <Text style={styles.stampTotal}>/10</Text>
              </Text>
              <Image style={styles.stampImage} source={stampImages[nowStamp]} />
            </View>
          }
        />
        <View style={styles.info}>
          <Box
            content={
              <>
                <Text style={[styles.infoText, { marginTop: 15 }]}>
                  ◾ 소복소복 10개 적립 시, 해당 상점 쿠폰 발행
                </Text>
                <Text style={styles.infoText}>
                  ◾ 적립 기준은 상점마다 상이할 수 있습니다.
                </Text>
                <Text style={[styles.infoText, { marginBottom: 15 }]}>
                  ◾ 타 상점과 함께 사용 불가합니다.
                </Text>
              </>
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]} onPress={handleStamp}>
            <Text style={[styles.buttonText]}>적립하기</Text>
          </TouchableOpacity>
        </View>

        <PlusMinusModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          alertTitle={`도장 적립`}
          stampCount={stampCount}
          onIncrement={incrementStampCount}
          onDecrement={decrementStampCount}
          onPress={handlePress}
        />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
