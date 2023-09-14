import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./styles";

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignUp = () => {
    // 여기에서 회원가입 로직을 작성합니다.
    // 예: Firebase를 사용하여 회원가입 요청을 보냅니다.
  };

  return (
    <View style={styles.container}>
      <Text>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="핸드폰 번호"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  );
}
