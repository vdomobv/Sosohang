import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Tabs({navigation}) {
  return (
    <View style={styles.container}>
      <Ionicons size={40} name="basket" onPress={() => {navigation.navigate("Cart")}}/>
      <Ionicons size={40} name="people" onPress={() => {navigation.navigate("YouAndMe")}} />
      <Ionicons size={40} name="home"  onPress={() => {navigation.navigate("Main")}}/>
      <Ionicons size={40} name="gift" onPress={() => {navigation.navigate("MyGift")}}/>
      <Ionicons size={40} name="person" onPress={() => {navigation.navigate("MyPage")}}/>
    </View>
  );
}
