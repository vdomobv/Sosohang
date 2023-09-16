import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";

export default function SignUp({ navigation }) {
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleLogIn = () => {
    // 전화번호가 11자리인지 확인
    if (loginPhoneNumber.length === 11) {
      // 비밀번호가 조건에 맞는지 확인
      if (
        loginPassword.match(/^(?=.*?[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,15}$/)
      ) {
        // 로그인 로직 작성
      } else {
        // 비밀번호가 조건에 맞지 않을 경우 경고창 표시
        Alert.alert(
          "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
        );
      }
    } else {
      // 전화번호가 11자리가 아닐 경우 경고창 표시
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  // 비밀번호 찾기 페이지 이동
  const handleFindPassword = () => {
    navigation.navigate("FindPassword");
  };

  const handleAuth = () => {
    if (phoneNumber.length === 11) {
      // 인증 로직 작성
    } else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  const handleSignUp = () => {
    // 전화번호가 11자리인지 확인
    if (phoneNumber.length === 11) {
      // 비밀번호가 조건에 맞는지 확인
      if (
        password.match(/^(?=.*?[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,15}$/)
      ) {
        // confirmPassword가 비어있지 않은지 확인
        if (confirmPassword) {
          // 닉네임 길이 검사
          if (nickname.length >= 2 && nickname.length <= 10) {
            // 비밀번호와 confirmPassword가 일치하는지 확인
            if (password === confirmPassword) {
              // 여기에서 회원가입 로직 작성
              // 예: Firebase를 사용하여 회원가입 요청을 보냅니다.
            } else {
              // 비밀번호와 confirmPassword가 일치하지 않을 경우 경고창 표시
              Alert.alert("알림", "비밀번호가 일치하지 않습니다.");
            }
          } else {
            // 닉네임 길이가 2글자 미만 또는 10글자를 초과할 경우 경고창 표시
            Alert.alert("알림", "닉네임은 2~10글자를 입력해 주세요.");
          }
        } else {
          // confirmPassword가 비어있을 경우 경고창 표시
          Alert.alert("알림", "비밀번호를 한 번 더 입력해 주세요.");
        }
      } else {
        // 비밀번호가 조건에 맞지 않을 경우 경고창 표시
        Alert.alert(
          "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
        );
      }
    } else {
      // 전화번호가 11자리가 아닐 경우 경고창 표시
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
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
              setPhoneNumber(text);
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

      <TouchableOpacity style={{ marginTop: 8 }} onPress={handleFindPassword}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ textAlign: 'left' }}>비밀번호 찾기</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />{/* 가로선 추가 */}

      <Text style={styles.title}>회원가입</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={[styles.input, {width: '63%'}]}
          placeholder="전화번호를 입력해 주세요."
          keyboardType="numeric"
          maxLength={11} // 이 부분을 추가하여 최대 길이를 11로 설정
          onChangeText={(text) => {
            // 입력된 값이 숫자인지 확인
            if (/^[0-9]*$/.test(text)) {
              // 숫자인 경우에만 상태 업데이트
              if (text.length <= 11) {
                setPhoneNumber(text);
              }
            } else {
              // 숫자가 아닌 경우 경고창 표시
              Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
            }
          }}
          value={phoneNumber}
        />
        <TouchableOpacity
          style={[styles.minibutton]}
          onPress={handleAuth}
        >
          <Text style={[styles.buttonText]}>
            인증
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호 [ 대/소문자, 숫자, 특수문자 포함 6~15자 ]"
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
        placeholder="닉네임을 입력해 주세요."
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
