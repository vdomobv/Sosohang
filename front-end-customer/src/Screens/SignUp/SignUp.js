import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import styles from "./styles";

export default function SignUp({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleFindPassword = () => {
    navigation.navigate("FindPassword");
  };

  const handleSignUp = () => {
    // 여기에서 회원가입 로직을 작성합니다.
    // 예: Firebase를 사용하여 회원가입 요청을 보냅니다.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력해 주세요."
        keyboardType="numeric"
        maxLength={11} // 이 부분을 추가하여 최대 길이를 11로 설정
        onChangeText={(text) => {
          if (text.length <= 11) {
            setPhoneNumber(text);
          }
        }}
        value={phoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해 주세요."
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleSignUp}>
        <Text style={[styles.buttonText]}>
          로그인
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 8 }} onPress={handleFindPassword}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={{ textAlign: 'left' }}>비밀번호 찾기</Text>
  </View>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />{/* 가로선 추가 */}

      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력해 주세요."
        keyboardType="numeric"
        maxLength={11} // 이 부분을 추가하여 최대 길이를 11로 설정
        onChangeText={(text) => {
          if (text.length <= 11) {
            setPhoneNumber(text);
          }
        }}
        value={phoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력해 주세요."
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 한 번 더 입력해 주세요."
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="사용할 닉네임을 입력해 주세요."
        secureTextEntry
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />

      <TouchableOpacity
        style={[styles.button]} // 버튼 스타일 및 너비를 적용
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText]}>
          회원가입
        </Text>
      </TouchableOpacity>
    </View>
  );
}
