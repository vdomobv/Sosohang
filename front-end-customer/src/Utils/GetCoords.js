import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCoords } from "./SetCoords";

export const getCoords = async () => {
  try {
    const loadedCoords = await AsyncStorage.getItem("coords");

    setCoords(JSON.parse(loadedCoords) || {});
    return loadedCoords;
  } catch (e) {
    console.log("GetCoords Error: ", e);
  }
};
