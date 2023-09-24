import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { View, } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Tabs({ navigation }) {
  const route = useRoute();

  return (
    <View style={styles.container}>
      {/* 로그인 된 상태면 "lock-open" */}
      <Ionicons size={45} name="lock-closed" 
        onPress={() => {
          if (route != "LogIn") {
            navigation.navigate("LogIn")
        }
      }} />
      
      <Ionicons size={40} name="qr-code-outline" onPress={() => {
        if (route != "QrReader") {
          navigation.navigate("QrReader")
        }
      }} />
      <FontAwesome5Icon size={40} name="stamp"
        onPress={() => {
          if (route != "Stamp") {
            navigation.navigate("Stamp")
          }
        }} />
    </View>
  );
}
