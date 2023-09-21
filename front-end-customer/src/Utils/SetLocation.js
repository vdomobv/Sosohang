import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export const setLocation = async (latitude, longitude) => {
  try {
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    
  } catch (e) {
    console.log("SetLocation Error: ", e);
  }
};
