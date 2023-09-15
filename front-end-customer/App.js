import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from './src/Screens/Main/Main';
import Cart from "./src/Screens/Cart/Cart";
import YouAndMe from "./src/Screens/YouAndME/YouAndMe";
import MyGift from "./src/Screens/MyGift/MyGift";
import MyPage from "./src/Screens/MyPage/MyPage";
import SignUp from "./src/Screens/SignUp/SignUp";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Main" component={Main}  />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="YouAndMe" component={YouAndMe} />
        <Stack.Screen name="MyGift" component={MyGift} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
