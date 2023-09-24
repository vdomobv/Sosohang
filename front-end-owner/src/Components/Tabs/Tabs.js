import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { View, } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Tabs({ navigation }) {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Ionicons size={40} name="basket" onPress={() => {
        if (route != "Cart") {
          navigation.navigate("Cart")
        }
      }} />
      <Ionicons size={40} name="people" onPress={() => {
        if (route != "YouAndMe") {
          navigation.navigate("YouAndMe")
        }
      }} />
      <Ionicons size={40} name="home"
        onPress={() => {
          if (route != "Main") {
            navigation.navigate("Main")
          }
        }} />
      <Ionicons size={40} name="gift"
        onPress={() => {
          if (route != "MyGift") {
            navigation.navigate("MyGift")
          }
        }} />
      <Ionicons size={40} name="person" onPress={() => {
        if (route != "MyPage") {
          navigation.navigate("MyPage")
        }
      }} />
    </View>
  );
}
