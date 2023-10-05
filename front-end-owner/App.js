// App.js
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "./src/Screens/LogIn/LogIn";
import QrReader from "./src/Screens/QrReader/QrReader";
import InputPayment from "./src/Screens/InputPayment/InputPayment";
import DonePayment from "./src/Screens/DonePayment/DonePayment";
import ShowStamp from "./src/Screens/ShowStamp/ShowStamp";
import AddStamp from "./src/Screens/AddStamp/AddStamp";
import NewStamp from "./src/Screens/NewStamp/NewStamp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* 초기 화면 설정 */}
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: true }}>
        <Stack.Screen name="로그인" component={LogIn} />
        <Stack.Screen name="QR코드 조화" component={QrReader} />
        <Stack.Screen name="결제" component={InputPayment} />
        <Stack.Screen name="결제완료" component={DonePayment} />
        <Stack.Screen name="소복소복 조회" component={ShowStamp} />
        <Stack.Screen name="소복보속 적립" component={AddStamp} />
        <Stack.Screen name="소복소복 생성" component={NewStamp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
