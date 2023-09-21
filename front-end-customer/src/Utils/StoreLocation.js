import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (coords, location) => {
  try {
    await AsyncStorage.setItem("coords", JSON.stringify(coords));
    await AsyncStorage.setItem("location", JSON.stringify(location));
  } catch (e) {
    console.log("StoreLocation Error: ", e);
  }
};
