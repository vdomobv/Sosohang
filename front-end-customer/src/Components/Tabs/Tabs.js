import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
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
        <Ionicons size={35} name="basket"
          color={activeTab === "Cart" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "Cart") {
              navigation.navigate("Cart")
            }
          }} />
        <Text style={styles.name}>장바구니</Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons size={35} name="people"
          color={activeTab === "YouAndMe" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "YouAndMe") {
              navigation.navigate("YouAndMe")
            }
          }} />
        <Text style={styles.name}>너랑나랑</Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons size={35} name="home"
          color={activeTab === "Main" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "Main") {
              navigation.navigate("Main")
            }
          }} />
        <Text style={styles.name}>소소행</Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons size={35} name="gift"
          color={activeTab === "MyGift" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "MyGift") {
              navigation.navigate("MyGift")
            }
          }} />
        <Text style={styles.name}>선물함</Text>
      </View>      
      <View style={styles.subContainer}>
        <Ionicons size={35} name="pencil"
          color={activeTab === "Review" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "Review") {
              navigation.navigate("Review")
            }
          }} />
        <Text style={styles.name}>사용후기</Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons size={35} name="person"
          color={activeTab === "MyPage" ? "#46C27D" : "black"}
          onPress={() => {
            if (route != "MyPage") {
              navigation.navigate("MyPage")
            }
          }} />
        <Text style={styles.name}>내정보</Text>
      </View>
    </View>
  );
}
