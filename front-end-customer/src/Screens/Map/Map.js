import styles from "./styles";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

import Title from "../../Components/Title/Title";
import Loading from "../../Components/Loading/Loading";

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({
    latitude: 35.1595454,
    longitude: 126.8526012,
  });

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      console.log(coords.latitude, coords.longitude);

      setCoords({ latitude, longitude });
      // setIsLoading(false);
    } catch (e) {
      Alert.alert("위치정보를 가져올 수 없습니다.");
    }

    render(() => {
      <Loading/>;
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Title title={"지도"} />
      <MapView
        style={styles.map}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
