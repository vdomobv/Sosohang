import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import axios from "axios";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import Tabs from "../../Components/Tabs/Tabs";

export default function LogIn({ navigation }) {
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogIn = () => {
    // 전화번호가 11자리인지 확인
    if (loginPhoneNumber.length === 11) {
      // 비밀번호가 조건에 맞는지 확인
      if (
        loginPassword.match(/^(?=.*?[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,15}$/)
      ) {
        // 로그인 로직 작성
        // axios
        //   .post('http://172.30.1.74:8080/api/v1/member/login', {
        //       memberPhone: loginPhoneNumber,
        //       memberPassword: loginPassword
        //   })
        //   .then((response) => {
        //     // 로그인 성공 시 처리
        //     if (response.data) {
        //       Alert.alert("알림", "로그인 성공!");
        //       console.log(response.data.token);
        //     } else {
        //       Alert.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
        //     }
        //   })
        //   .catch((error) => {
        //     // 로그인 실패 시 처리
        //     Alert.alert("알림", "로그인에 실패하였습니다. 다시 시도해 주세요.");
        //     console.log(error)
        //   });
      } else {
        Alert.alert(
          "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
        );
      }
    } else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={"사장님 로그인"} />
        {/* <View style={styles.loginContainer}> */}

        <Text style={styles.info}>비밀번호 찾기는 웹사이트에서 가능합니다.</Text>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="전화번호를 입력해 주세요."
            keyboardType="numeric"
            maxLength={11} // 최대 길이를 11로 설정
            onChangeText={(text) => {
              // 입력된 값이 숫자인지 확인
              if (/^[0-9]*$/.test(text)) {
                // 숫자인 경우에만 상태 업데이트
                if (text.length <= 11) {
                  setLoginPhoneNumber(text);
                }
              } else {
                // 숫자가 아닌 경우 경고창 표시
                Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
              }
            }}
            value={loginPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해 주세요."
            secureTextEntry
            onChangeText={(text) => setLoginPassword(text)}
            value={loginPassword}
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleLogIn}>
            <Text style={[styles.buttonText]}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tabs navigation={navigation} />
    </>
  );
}