import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (navigation, loginPhoneNumber, loginPassword) => {
    axios
        .post("http://j9c109.p.ssafy.io:8081/api/v1/member/login", {
            memberPhone: loginPhoneNumber,
            memberPassword: loginPassword,
        })
        .then((response) => {
            // 로그인 성공 시 처리
            if (response.data.token) {
                setMemberSeq(response.data.member.memberSeq);
                Alert.alert("알림", "로그인 성공!");
                navigation.navigate('Main')
            } else {
                Alert.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
            }
        })
        .catch((error) => {
            // 로그인 실패 시 처리
            Alert.alert("알림", "로그인에 실패하였습니다. 다시 시도해 주세요.");
            console.log(error)
        });
}

export const setMemberSeq = async (memberSeq) => {
    try {
        await AsyncStorage.setItem(
            "memberSeq", JSON.stringify(memberSeq)
        );

    } catch (e) {
        console.log("SetMemberSeq Error: ", e);
    }
};

export const getMemberSeq = async () => {
    try {
        const storedValue = JSON.parse(await AsyncStorage.getItem("memberSeq"));

        if (storedValue === null || storedValue === undefined) {
            return undefined;
        }

        const memberSeq = JSON.parse(storedValue);
        return memberSeq;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem("memberSeq");
    } catch (e) {
        console.log(e);
    }
}