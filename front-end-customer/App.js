import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./src/Screens/Main/Main";
import Cart from "./src/Screens/Cart/Cart";
import MakeCard from "./src/Screens/MakeCard/MakeCard";
import YouAndMe from "./src/Screens/YouAndME/YouAndMe";
import MyGift from "./src/Screens/MyGift/MyGift";
import MyPage from "./src/Screens/MyPage/MyPage";
import SignUp from "./src/Screens/SignUp/SignUp";
import Map from "./src/Screens/Map/Map";
import FindPassword from "./src/Screens/FindPassword/FindPassword";
import ChangePassword from "./src/Screens/ChangePassword/ChangePassword";
import StampList from "./src/Screens/StampList/StampList";
import Stamp from "./src/Screens/Stamp/Stamp";
import Dibs from "./src/Screens/Dibs/Dibs";
import PurchaseHistory from "./src/Screens/PurchaseHistory/PurchaseHistory";

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
        <Stack.Screen name="MyGift" component={MyGift} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="FindPassword" component={FindPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="StampList" component={StampList} />
        <Stack.Screen name="Stamp" component={Stamp} />
        <Stack.Screen name="Dibs" component={Dibs} />
        <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
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
