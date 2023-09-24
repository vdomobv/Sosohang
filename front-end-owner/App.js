// App.js
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useState, useEffect } from "react";

import Main from "./src/Screens/Main/Main";
import SignUp from "./src/Screens/SignUp/SignUp";
import LogIn from "./src/Screens/LogIn/LogIn";
import QrReader from "./src/Screens/QrReader/QrReader";
import AddStamp from "./src/Screens/AddStamp/AddStamp";

const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignUp" component={SignUp} />
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
