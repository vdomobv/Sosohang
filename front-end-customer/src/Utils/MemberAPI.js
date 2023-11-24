import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = (navigation, loginPhoneNumber, loginPassword) => {
    axios
        .post("/api/v1/member/login", {
            memberPhone: loginPhoneNumber,
            memberPassword: loginPassword,
        })
        .then((response) => {
            // 로그인 성공 시 처리
            if (response.data.token) {
                setMemberSeq(response.data.member.memberSeq);
                // Alert.alert("알림", "로그인");
                navigation.navigate('Main')
            } else {
                Alert.alert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
            }
        })
        .catch((error) => {
            // 로그인 실패 시 처리
            Alert.alert("알림", "로그인에 실패하였습니다. 다시 시도해 주세요.");
            // console.log(error)
        });
}

export const setMemberSeq = async (memberSeq) => {
    try {
        await AsyncStorage.setItem(
            "memberSeq", JSON.stringify(memberSeq)
        );

    } catch (e) {
        // console.log("SetMemberSeq Error: ", e);
    }
};

export const getMemberSeq = async () => {
    try {
        const storedValue = JSON.parse(await AsyncStorage.getItem("memberSeq"));

        if (storedValue === null || storedValue === undefined) {
            // console.log('저장된 사용자 없음.')
            return undefined;
        }

        const memberSeq = JSON.parse(storedValue);
        return memberSeq;
    } catch (e) {
        // console.log(e);
        return undefined;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem("memberSeq");
    } catch (e) {
        // console.log(e);
    }
}

export const getMemberData = async (memberSeq) => {
    try {
        const response = await axios.get(
            `/api/v1/member/${memberSeq}`
        );

        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in getMemberData:", error);
    }
}

export const updateMemberNickname = async (memberSeq, newNickname) => {
    try {
        const response = await axios.put(
            `api/v1/member/update/${memberSeq}?newMemberNickname=${newNickname}`
        );

        return response.data;
    } catch (error) {
        // console.error("Error fetching store data in getMemberData:", error);
    }
}


export const handlePhoneVerification = (phoneNumber) => {
    axios.post("/api/v1/member/handlePhoneVerification", { phoneNumber: phoneNumber })
        .then((response) => {
            const responseData = response.data;
            if (responseData === "이미 가입된 사용자입니다.") {
                Alert.alert("알림", "이미 가입된 사용자입니다.");
            } else if (responseData === "인증번호 전송 완료!") {
                Alert.alert("알림", "인증 코드가 전송되었습니다.");
                // 여기서 인증 코드 입력 화면으로 이동하는 로직 등을 추가할 수 있습니다.
            } else {
                Alert.alert("알림", "알 수 없는 응답입니다. 다시 시도해주세요.");
            }
        })
        .catch((error) => {
            Alert.alert("알림", "오류가 발생했습니다. 다시 시도해 주세요.");
            // console.error(error);
        });
}