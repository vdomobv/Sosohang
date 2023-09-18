import React, { useState } from "react";
import styles from "./styles";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleChangePassword = () => {
      // 비밀번호가 조건에 맞는지 확인
      if (
        password.match(/^(?=.*?[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,15}$/)
      ) {
        if (password === confirmPassword) {
          // 비밀번호 변경 로직 작성
        } else {
          Alert.alert("알림", "비밀번호가 일치하지 않습니다.");
        }
        
      } else {
        // 비밀번호가 조건에 맞지 않을 경우 경고창 표시
        Alert.alert(
          "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
        );
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 변경</Text>
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호 [대/소문자, 숫자, 특수문자 포함 6~15자]"

        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호 확인"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TouchableOpacity
        style={[styles.button]} // 버튼 스타일 및 너비를 적용
        onPress={handleChangePassword}
      >
        <Text style={[styles.buttonText]}>
          비밀번호 변경
        </Text>
      </TouchableOpacity>

    </View>
  );
}
