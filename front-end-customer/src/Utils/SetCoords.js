// SetCoords.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export const setCoords = async () => {
  try {
    await Location.requestForegroundPermissionsAsync();

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    await AsyncStorage.setItem(
      "coords",
      JSON.stringify({ latitude, longitude })
    );

    return { latitude, longitude };
  } catch (e) {
    console.log("SetCoords Error: ", e);
  }
};
