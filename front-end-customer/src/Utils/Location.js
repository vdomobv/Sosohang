import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Alert } from "react-native";

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

        await AsyncStorage.setItem(
            "location",
            JSON.stringify(location)
        );

        return location;
    } catch (e) {
        console.log("SetLocation Error: ", e);
    }
};

// storeData
export const storeData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
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

// initializeCoords
export const initializeCoords = async () => {
    const coords = JSON.parse(await getCoords());
    if (coords) {
        console.log("coords is");
        return coords;
    } else {
        console.log("coords isn't");
        const newCoords = await setCoords();
        storeData('coords', newCoords);
        return newCoords;
    }
};

// initializeLocation
export const initializeLocation = async (latitude, longitude) => {
    const location = JSON.parse(await getLocation());
    if (location) {
        console.log("location is");
        if (typeof location === 'string') {
            return location;
        } else {
            return location[0].street ? location[0].street : location[0].district
        }
    } else {
        console.log("location isn't");
        const newLocation = await setLocation(latitude, longitude);
        storeData('location', newLocation);
        return newLocation;
    }
};

// geoCoding
export const geoCoding = async (address) => {
    try {
        await Location.requestForegroundPermissionsAsync();
        const geocodeResult = await Location.geocodeAsync(address);
        const latitude = geocodeResult[0].latitude;
        const longitude = geocodeResult[0].longitude;

        // console.log("GEOCODE RESULT COORDS : ", latitude, longitude);
        await AsyncStorage.setItem(
            "coords",
            JSON.stringify({ latitude, longitude })
        );

        return { latitude, longitude };

    } catch (e) {
        console.log(e);
        Alert.alert('장소 검색을 위해서 위치 접근을 허용해주세요');
    }
}

