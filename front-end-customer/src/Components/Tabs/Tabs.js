import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
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
      <Ionicons size={40} name="basket"
        color={activeTab === "Cart" ? "#46C27D" : "black"}
        onPress={() => {
          if (route != "Cart") {
            navigation.navigate("Cart")
          }
        }} />
      <Ionicons size={40} name="people"
        color={activeTab === "YouAndMe" ? "#46C27D" : "black"}
        onPress={() => {
        if (route != "YouAndMe") {
          navigation.navigate("YouAndMe")
        }
      }} />
      <Ionicons size={40} name="home"
        color={activeTab === "Main" ? "#46C27D" : "black"}
        onPress={() => {
          if (route != "Main") {
            navigation.navigate("Main")
          }
        }} />
      <Ionicons size={40} name="gift"
        color={activeTab === "MyGift" ? "#46C27D" : "black"}
        onPress={() => {
          if (route != "MyGift") {
            navigation.navigate("MyGift")
          }
        }} />
      <Ionicons size={40} name="person"
        color={activeTab === "MyPage" ? "#46C27D" : "black"}
        onPress={() => {
        if (route != "MyPage") {
          navigation.navigate("MyPage")
        }
      }} />
    </View>
  );
}
