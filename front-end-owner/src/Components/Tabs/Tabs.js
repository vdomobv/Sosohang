import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { View, } from "react-native";
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
      {/* 로그인 된 상태면 "lock-open" */}
      <Ionicons size={45} name="lock-closed"
        color={activeTab === "LogIn" ? "#46C27D" : "black"}
        onPress={() => {
          if (route != "LogIn") {
            navigation.navigate("LogIn")
          }
        }} />

      <Ionicons size={40} name="qr-code-outline" 
        color={activeTab === "QrReader" ? "#46C27D" : "black"}
        onPress={() => {
        if (route != "QrReader") {
          navigation.navigate("QrReader")
        }
      }} />
      <FontAwesome5Icon size={40} name="stamp"
        color={activeTab === "Stamp" ? "#46C27D" : "black"}
        onPress={() => {
          if (route != "Stamp") {
            navigation.navigate("Stamp")
          }
        }} />
    </View>
  );
}
