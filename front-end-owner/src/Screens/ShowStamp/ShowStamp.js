// components
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from 'react';
import styles from "./styles";
import axios from 'axios';
import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Box from "../../Components/Box/Box";
import ModalCustom from "../../Components/ModalCustom/ModalCustom";
import Tabs from "../../Components/Tabs/Tabs";

export default function ShowStamp({ navigation, route }) {
  const { storeSeq } = route.params;

  const [stampPhoneNumber, setStampPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [stampData, setStampData] = useState([]);
  const [memberNickname, setMemberNickname] = useState("");

  const handleShowStamp = async () => {
    if (stampPhoneNumber.length === 11) {
      try {
        const response = await axios.get(
          `https://j9c109.p.ssafy.io/api/v1/stamp/${stampPhoneNumber}/${storeSeq}?stampStatus=0`
        );

        const { data } = response;

        if (isEmptyArray(data)) {
          console.log(typeof(data));
          setStampData(data);
          setMemberNickname(data[0].member.memberNickname);
          setModalVisible(true);
        } else {
          Alert.alert('알림', '해당 회원의 정보가 없습니다.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
        Alert.alert('알림', '데이터를 불러오는 중에 오류가 발생했습니다.');
      }
    } else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <View style={styles.subContainer}>
          <Image style={styles.stampImage}
            source={require('assets/images/stamp.png')}
          />
          <Box
            content={
              <View style={styles.stampBox}>
                <SubTitle subTitle={"소복소복 조회하기"} customStyles={{ color: "#FFBF46" }} />
                <Text style={[styles.text, { marginTop: 50 }]}>회원 전화번호 입력</Text>
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    style={[styles.textInput, { width: 240 }]}
                    keyboardType="numeric"
                    maxLength={11}
                    onChangeText={(text) => {
                      if (/^[0-9]*$/.test(text)) {
                        if (text.length <= 11) {
                          setStampPhoneNumber(text);
                        }
                      } else {
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
            onPress={handleShowStamp}
          >
            <Text style={[styles.buttonText]}>
              회원 정보 조회
            </Text>
          </TouchableOpacity>
        </View>

        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={'회원 정보 확인'}
          alertText={`${memberNickname} 회원님이 맞으신가요?`}
          onPress={() => {
            navigation.navigate('AddStamp', { stampData });
            setModalVisible(false);
          }}
        />

      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
