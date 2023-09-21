import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

// getCoords
export const getCoords = async () => {
    try {
        const loadedCoords = await AsyncStorage.getItem("coords");

        return loadedCoords;
    } catch (e) {
        console.log("GetCoords Error: ", e);
    }
};

// getLocation
export const getLocation = async () => {
    try {
        const loadedLocation = await AsyncStorage.getItem("location");
        return loadedLocation;
    } catch (e) {
        console.log(e);
    }
};

// setCoords
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
        await AsyncStorage.setItem("coords", { latitude: 35.1595454, longitude: 126.8526012 })
    }
};

// setLocation
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

// storeCoords
export const storeCoords = async (coords) => {
    try {
        await AsyncStorage.setItem("coords", JSON.stringify(coords));
    } catch (e) {
        console.log("StoreLocation Error: ", e);
    }
};


// storeLocation
export const storeLocation = async (coords) => {
    try {
        await AsyncStorage.setItem("location", JSON.stringify(location));
    } catch (e) {
        console.log("StoreLocation Error: ", e);
    }
};

// removeData
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
};