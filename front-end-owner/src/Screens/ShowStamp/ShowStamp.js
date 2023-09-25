// components
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react';
import styles from "./styles";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Box from "../../Components/Box/Box";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import Tabs from "../../Components/Tabs/Tabs";

export default function ShowStamp({ navigation }) {
  const [stampPhoneNumber, setStampPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogIn = () => {
    if (stampPhoneNumber.length === 11) {
      // 회원 정보가 있다면? 해당 회원의 해당 상점 스탬프 정보 가져오기

    } else {
      // 회원 정보가 없다면? 재입력

      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  const handleShowStamp = () => {
    setModalVisible(true);
  }

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <View style={styles.subContainer}>
          <Box
            content={
              <View style={styles.stampBox}>
                <SubTitle subTitle={"소복소복 조회하기"} customStyles={{ color: "#FFBF46" }} />
                <Text style={[styles.text, { marginTop: 50 }]}>회원 전화번호 입력</Text>
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    style={[styles.textInput, { width: 240 }]}
                    keyboardType="numeric"
                    maxLength={11} // 최대 길이를 11로 설정
                    onChangeText={(text) => {
                      // 입력된 값이 숫자인지 확인
                      if (/^[0-9]*$/.test(text)) {
                        // 숫자인 경우에만 상태 업데이트
                        if (text.length <= 11) {
                          setStampPhoneNumber(text);
                        }
                      } else {
                        // 숫자가 아닌 경우 경고창 표시
                        Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
                      }
                    }}
                    value={stampPhoneNumber}
                  />
                </View>
              </View>
            } />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleShowStamp}>
            <Text style={[styles.buttonText]}>
              회원 정보 조회
            </Text>
          </TouchableOpacity>
        </View>

        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={'회원 확인'}
          alertText={'OO님이신가요?'}
          // alertText={`${scannedData?.data} 님이 맞습니까?`}
          targetScreen="AddStamp"
        />
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
