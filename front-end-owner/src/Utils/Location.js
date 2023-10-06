import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Alert } from "react-native";

// getCoords
export const getCoords = async () => {
    try {
        const loadedCoords = await AsyncStorage.getItem("coords");

        return loadedCoords;
    } catch (e) {
    }
};

// getLocation
export const getLocation = async () => {
    try {
        const loadedLocation = await AsyncStorage.getItem("location");
        return loadedLocation;
    } catch (e) {
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
    }
};

// storeData
export const storeData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
    }
};

// removeData
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
    }
};

// initializeCoords
export const initializeCoords = async () => {
    const coords = JSON.parse(await getCoords());
    if (coords) {
        return coords;
    } else {
        const newCoords = await setCoords();
        storeData('coords', newCoords);
        return newCoords;
    }
};

// initializeLocation
export const initializeLocation = async (latitude, longitude) => {
    const location = JSON.parse(await getLocation());
    if (location) {
        if (typeof location === 'string') {
            return location;
        } else {
            return location[0].street ? location[0].street : location[0].district
        }
    } else {
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

        await AsyncStorage.setItem(
            "coords",
            JSON.stringify({ latitude, longitude })
        );

        return { latitude, longitude };

    } catch (e) {
        Alert.alert('장소 검색을 위해서 위치 접근을 허용해주세요');
    }
}