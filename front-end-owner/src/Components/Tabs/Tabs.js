import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalCustom from "../ModalCustom/ModalCustom";

export default function Tabs({ navigation }) {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("Main");
  const [modalVisible, setModalVisible] = useState(false);
  const [storeSeq, setStoreSeq] = useState("");

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get("https://j9c109.p.ssafy.io/api/v1/store/token_test")
      .then((res) => {
        // console.log(res.data);
        if (res.data === false) {
          setIsAuth(false);
        } else {
          setStoreSeq(res.data.storeSeq);
          setIsAuth(true);
        }
      })
      .catch((err) => {
        setIsAuth(false);
      });
  }, []);

  const handleLogOut = () => {
    axios.get("https://j9c109.p.ssafy.io/api/v1/store/logout");
    setIsAuth(false);
    navigation.navigate("LogIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* 로그인 된 상태면 "lock-open" */}
        <Ionicons
          size={30}
          name={isAuth ? "lock-open" : "lock-closed"}
          color={activeTab === "LogIn" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "LogIn" && !isAuth) {
              navigation.navigate("LogIn");
            } else {
              handleLogOut();
            }
          }}
        />
        <Text style={styles.name}>{isAuth ? "로그아웃" : "로그인"}</Text>
      </View>

      <View style={styles.subContainer}>
        <Ionicons
          size={30}
          name="qr-code-outline"
          color={activeTab === "QrReader" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "QrReader" && isAuth) {
              navigation.navigate("QrReader");
            } else {
              setModalVisible(true);
            }
          }}
        />
        <Text style={styles.name}>QR</Text>
      </View>

      {/* <View style={styles.subContainer}>
        <FontAwesome5Icon size={35} name="credit-card"
          color={(activeTab === "InputPayment" || activeTab === "DonePayment") ? "#46C27D" : "black"}
          onPress={() => {
            if (route !== "InputPayment") {
              navigation.navigate("InputPayment");
            }
          }}
        />
        <Text style={styles.name}>(테스트용)</Text>
      </View> */}

      <View style={styles.subContainer}>
        <FontAwesome5Icon
          size={30}
          name="stamp"
          color={
            activeTab === "ShowStamp" || activeTab === "AddStamp"
              ? "#46C27D"
              : "black"
          }
          onPress={() => {
            if (route !== "ShowStamp" && isAuth) {
              navigation.navigate("ShowStamp", { storeSeq: storeSeq });
            } else {
              setModalVisible(true);
            }
          }}
        />
        <Text style={styles.name}>도장</Text>

        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          alertTitle={"알림"}
          alertText={"로그인이 필요합니다"}
          onPress={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
