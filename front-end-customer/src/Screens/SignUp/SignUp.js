import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import styles from "./styles";
import { login } from "../../Utils/MemberAPI";

export default function SignUp({ navigation }) {
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [authCode, setAuthCode] = useState("");
  const [showInput, setShowInput] = useState(false);

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
        login(navigation, loginPhoneNumber, loginPassword);
      } else {
        Alert.alert(
          "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
        );
      }
    } else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  // 비밀번호 찾기 페이지 이동
  const handleFindPassword = () => {
    navigation.navigate("FindPassword");
  };

  // 인증 버튼 핸들러
  const handleAuth = () => {
    if (phoneNumber.length === 11) {

      // 회원인지 판단, 비회원이라면 진행 (회원이라면? -> 로그인하도록)

      axios
        .post(`https://j9c109.p.ssafy.io/api/v1/member/register/phone-check?memberPhone=${phoneNumber}`, {
        })
        .then((response) => {
          if (response.data.status = "success") {
            Alert.alert("알림", "인증 성공!");
            setShowInput(true); // 인증 성공 시 인증번호 입력 창을 표시
            setAuthCode(response.data.authCode); // 요놈을 문자로 보냄
            // Alert.alert("알림", "인증 번호를 발송했습니다.");
          } else {
            // 다른 상황에 대한 처리
            Alert.alert("인증 실패", "인증에 실패하였습니다. 다시 시도해 주세요.");
          }
        })
        .catch((error) => {
          // 인증 실패 시 처리
          Alert.alert("알림", "이미 가입된 전화번호입니다.");
          // Alert.alert("오류", "다시 시도해 주세요.");
          console.log(error);
        });
    } else {
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  // 인증 확인 버튼 핸들러
  const handleAuthCode = () => {
    if (authCode.length === 6) {
      axios
        .post(`https://j9c109.p.ssafy.io/api/v1/member/register/verify-code?memberPhone=${phoneNumber}&authCode=${authCode}`, {
        })
        .then((response) => {
          console.log(response)
          // 인증 확인 성공 시 처리
          if (response.data.status === "success") {
            Alert.alert("알림", "인증이 완료되었습니다.");
          } else {
            // 인증 실패 처리
            Alert.alert("알림", "인증 번호가 올바르지 않습니다.");
          }
        })
        .catch((error) => {
          // 인증 실패 시 처리
          Alert.alert("오류", "다시 시도해 주세요.");
          console.log(error);
        });
    } else {
      Alert.alert("알림", "인증 번호를 바르게 입력해 주세요.");
    }
  };

  const handleSignUp = () => {
    if (phoneNumber.length === 11) {
      // 인증 완료했는지 확인, showInput 상태가 true인 경우
      if (showInput) {
        if (
          password.match(/^(?=.*?[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,15}$/)
        ) {
          // confirmPassword가 비어있지 않은지 확인
          if (confirmPassword) {
            // 닉네임 길이 검사
            if (nickname.length >= 2 && nickname.length <= 10) {
              // 비밀번호와 confirmPassword가 일치하는지 확인
              if (password === confirmPassword) {
                // 회원가입 로직 작성
                axios
                  .post("https://j9c109.p.ssafy.io/api/v1/member/register", {
                    memberNickname: nickname,
                    memberPhone: phoneNumber,
                    memberPassword: confirmPassword,
                  })
                  .then((response) => {
                    // 회원가입 성공 시 처리
                    if (response) {
                      Alert.alert("알림", "회원가입 성공!");
                      console.log(response)

                    } else {
                      Alert.alert("알림", "다시 시도해 주세요.");
                      console.log(response)
                    }
                  })
                  .catch((error) => {
                    Alert.alert("에러 발생", "회원가입에 실패하였습니다. 다시 시도해 주세요.");
                    console.log(error);
                  });
              } else {
                Alert.alert("알림", "비밀번호가 일치하지 않습니다.");
              }
            } else {
              Alert.alert("알림", "닉네임은 2~10글자를 입력해 주세요.");
            }
          } else {
            Alert.alert("알림", "비밀번호를 한 번 더 입력해 주세요.");
          }
        } else {
          Alert.alert(
            "알림", "비밀번호는 대/소문자, 숫자, 특수문자를 포함한 6~15자로 입력해 주세요."
          );
        }
      } else {
        // 인증 미완료시 경고창 표시
        Alert.alert("알림", "인증번호를 받아 인증을 완료해 주세요.");
      }
    } else {
      // 전화번호가 11자리가 아닐 경우 경고창 표시
      Alert.alert("알림", "전화번호를 바르게 입력해 주세요.");
    }
  };

  return (
    <ScrollView>
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

      <TouchableOpacity style={{ marginTop: 8 }} onPress={handleFindPassword}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ textAlign: 'left' }}>비밀번호 찾기</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />{/* 가로선 추가 */}

      <Text style={styles.title}>회원가입</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={[styles.input, { width: '57%' }]}
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
          style={[styles.miniButton]}
          onPress={handleAuth}
        >
          <Text style={[styles.buttonText]}>
            인증
          </Text>
        </TouchableOpacity>
      </View>

      {/* 인증 번호 발송 버튼 클릭 시 인증 번호 입력 활성화 */}
      {showInput && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={[styles.input, { width: '57%' }]}
            placeholder="인증 번호 6자를 입력해 주세요."
            keyboardType="numeric"
            maxLength={6} // 5자리로 설정
            onChangeText={(text) => setAuthCode(text)}
            value={authCode}
          />
          <TouchableOpacity
            style={[styles.miniButton]}
            onPress={handleAuthCode}
          >
            <Text style={[styles.buttonText]}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
    </ScrollView>
  );
}
