import styles from "./styles";
import { View, Text, Alert } from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import { useEffect } from "react";

export default function Map() {
  const getLocation = async () => {
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      console.log(response);
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
    } catch (err) {
      Alert.alert("위치 접근을 허용해주세요.");
    }
  };

  useEffect(() => {
    getLocation();
  });

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}
