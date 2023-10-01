// components
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import styles from "./styles";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Box from "../../Components/Box/Box";
import PlusMinusModal from "../../Components/PlusMinusModal/PlusMinusModal";
import Tabs from "../../Components/Tabs/Tabs";

export default function AddStamp({ route, navigation }) {
  const { stampData } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [stampCount, setStampCount] = useState(1);
  // 상점 seq
  // 폰넘버
  // stampCount

  const handleStamp = () => {
    setModalVisible(true);
  }

  const incrementStampCount = () => {
    if (stampCount < 10) {
      setStampCount(stampCount + 1);
    }
  };

  const decrementStampCount = () => {
    if (stampCount > 0) {
      setStampCount(stampCount - 1);
    }
  };

  const stampImages = {
    1: require('assets/images/stamp1.png'),
    2: require('assets/images/stamp2.png'),    
    3: require('assets/images/stamp3.png'),
    4: require('assets/images/stamp4.png'),
    5: require('assets/images/stamp5.png'),    
    6: require('assets/images/stamp6.png'),
    7: require('assets/images/stamp7.png'),
    8: require('assets/images/stamp8.png'),    
    9: require('assets/images/stamp9.png'),
    10: require('assets/images/stamp10.png'),
  };

  const handlePress = async () => {
    try {
      const response = await axios.post(
        'https://j9c109.p.ssafy.io/api/v1/stamp/earn',
        {
          storeSeq: 1,
          memberPhone: '01012341234',
          stampCount: stampCount,
        }
      );
  
      // 서버로부터의 응답 처리
      console.log('응답 데이터:', response.data);
  
      // 모달 닫기
      setModalVisible(false);
    } catch (error) {
      // 오류 처리
      console.error('오류 발생:', error);
      // 모달 닫기
      setModalVisible(false);
    }
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
              <SubTitle subTitle={"현재 적립 소복소복"} customStyles={{ color: "#FFBF46" }} />
              <Text style={styles.stampNow}>
                {/* 현재 스탬프 */}
                {stampData.length}
                <Text style={styles.stampTotal}>/10</Text>
              </Text>
              <Image style={styles.stampImage} source={stampImages[stampData.length]} />
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
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleStamp}>
            <Text style={[styles.buttonText]}>
              적립하기
            </Text>
          </TouchableOpacity>
        </View>

        <PlusMinusModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
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
