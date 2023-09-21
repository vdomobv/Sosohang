import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLocation } from "./SetLocation";

export const getLocation = async () => {
  try {
    const loadedLocation = await AsyncStorage.getItem("location");
    

    setLocation(JSON.parse(loadedLocation) || {});
  } catch (e) {
    console.log(e);
  }
};
