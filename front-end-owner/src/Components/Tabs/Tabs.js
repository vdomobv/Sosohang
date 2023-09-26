import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";


export default function Tabs({ navigation }) {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("Main");

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* 로그인 된 상태면 "lock-open" */}
        <Ionicons size={40} name="lock-closed"
          color={activeTab === "LogIn" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "LogIn") {
              navigation.navigate("LogIn")
            }
          }} />
        <Text>로그인</Text>
      </View>

      <View style={styles.subContainer}>
        <Ionicons size={40} name="qr-code-outline"
          color={activeTab === "QrReader" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "QrReader") {
              navigation.navigate("QrReader")
            }
          }} />
        <Text>QR</Text>
      </View>

      <View style={styles.subContainer}>
        <FontAwesome5Icon size={40} name="credit-card"
          color={(activeTab === "InputPayment" || activeTab === "DonePayment") ? "#46C27D" : "black"}
          onPress={() => {
            if (route !== "InputPayment") {
              navigation.navigate("InputPayment");
            }
          }}
        />
        <Text>결제</Text>
      </View>

      <View style={styles.subContainer}>
        <FontAwesome5Icon size={40} name="stamp"
          color={(activeTab === "ShowStamp" || activeTab === "AddStamp") ? "#46C27D" : "black"}
          onPress={() => {
            if (route !== "ShowStamp") {
              navigation.navigate("ShowStamp");
            }
          }}
        />
        <Text>도장</Text>
      </View>

    </View >
  );
}
