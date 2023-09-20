import React, { useState } from "react";
import styles from "./styles";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function FindPassword({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [showInput, setShowInput] = useState(false);

  // 인증 번호 발송 버튼 핸들러
  const handleAuth = () => {
    if (phoneNumber.length === 11) {
      // 인증 번호 발송 로직 작성
      // 인증 번호 발송 후, input 창(인증 번호 입력 창)을 표시하도록 상태 업데이트
      setShowInput(true);
       // 인증 번호를 발송하도록 구현
    } 
    else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  // 인증 확인 버튼 핸들러
  const handleAuthCode = () => {
    if (authCode.length === 5) {
      // 인증 확인 로직 작성
      // if (authCode === showInput) {
      //   Alert.alert("알림", "인증이 완료되었습니다.");
        navigation.navigate("ChangePassword");
 
      // } else {
      //   Alert.alert("알림", "인증 번호가 올바르지 않습니다.");
      // }
    } else {
      Alert.alert("알림", "인증 번호를 바르게 입력해 주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력해 주세요."
        keyboardType="numeric"
        maxLength={11}
        onChangeText={(text) => {
          // 입력된 값이 숫자인지 확인
          if (/^[0-9]*$/.test(text)) {
            // 숫자인 경우에만 상태 업데이트
            if (text.length <= 11) {
              setPhoneNumber(text);
            }
          } else {
            Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
          }
        }}
        value={phoneNumber}
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleAuth}
      >
        <Text style={[styles.buttonText]}>
          인증 번호 발송
        </Text>
      </TouchableOpacity>

      {/* 인증 번호 발송 버튼 클릭 시 인증 번호 입력 활성화 */}
      {showInput && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <TextInput
            style={[styles.input, { width: '57%' }]}
            placeholder="인증 번호 5자를 입력해 주세요."
            keyboardType="numeric"
            maxLength={5} // 5자리로 설정
            onChangeText={(text) => setAuthCode(text)}
            value={authCode}
          />
          <TouchableOpacity
            style={[styles.minibutton]}
            onPress={handleAuthCode}
          >
            <Text style={[styles.buttonText]}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}
