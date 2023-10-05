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
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="QrReader" component={QrReader} />
        <Stack.Screen name="InputPayment" component={InputPayment} />
        <Stack.Screen name="DonePayment" component={DonePayment} />
        <Stack.Screen name="ShowStamp" component={ShowStamp} />
        <Stack.Screen name="AddStamp" component={AddStamp} />
        <Stack.Screen name="NewStamp" component={NewStamp} />
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
