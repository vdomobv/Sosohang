// App.js
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useState, useEffect } from "react";

import Main from "./src/Screens/Main/Main";
import Cart from "./src/Screens/Cart/Cart";
import MakeCard from "./src/Screens/MakeCard/MakeCard";
import YouAndMe from "./src/Screens/YouAndMe/YouAndMe";
import YouAndMeStory from "./src/Screens/YouAndMeStory/YouAndMeStory";
import MyGift from "./src/Screens/MyGift/MyGift";
import MyGiftDetail from "./src/Screens/MyGiftDetail/MyGiftDetail";
import Review from "./src/Screens/Review/Review";
import MyPage from "./src/Screens/MyPage/MyPage";
import SignUp from "./src/Screens/SignUp/SignUp";
import Map from "./src/Screens/Map/Map";
import FindPassword from "./src/Screens/FindPassword/FindPassword";
import ChangePassword from "./src/Screens/ChangePassword/ChangePassword";
import StampList from "./src/Screens/StampList/StampList";
import Stamp from "./src/Screens/Stamp/Stamp";
import Dibs from "./src/Screens/Dibs/Dibs";
import Shop from "./src/Screens/Shop/Shop";
import WaitingPayment from "./src/Screens/WaitingPayment/WaitingPayment";
import Payment from "./src/Screens/Payment/Payment";
import PaymentResult from "./src/Screens/PaymentResult/PaymentResult";
import List from "./src/Screens/List/List";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="MakeCard" component={MakeCard} />
        <Stack.Screen name="YouAndMe" component={YouAndMe} />
        <Stack.Screen name="YouAndMeStory" component={YouAndMeStory} />
        <Stack.Screen name="MyGift" component={MyGift} />
        <Stack.Screen name="MyGiftDetail" component={MyGiftDetail} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="FindPassword" component={FindPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="StampList" component={StampList} />
        <Stack.Screen name="Stamp" component={Stamp} />
        <Stack.Screen name="Dibs" component={Dibs} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="WaitingPayment" component={WaitingPayment} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PaymentResult" component={PaymentResult} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
