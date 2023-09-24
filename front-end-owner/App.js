// App.js
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useState, useEffect } from "react";

import LogIn from "./src/Screens/LogIn/LogIn";
import QrReader from "./src/Screens/QrReader/QrReader";
import AddStamp from "./src/Screens/AddStamp/AddStamp";

const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      {/* 초기 화면 설정 */}
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="QrReader" component={QrReader} />
        <Stack.Screen name="AddStamp" component={AddStamp} />
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
