import styles from "./styles";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";

import Title from "../../Components/Title/Title";

export default function Map({ route }) {
  const [nowCoords, setNowCoords] = useState(route.params.coords);
  const [nowLocation, setNowLocation] = useState(route.params.location[0]);

  return (
    <View style={styles.container}>
      <Title title={nowLocation.street ? nowLocation.street : nowLocation.district} />
      <MapView
        style={styles.map}
        region={{
          latitude: nowCoords.latitude,
          longitude: nowCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: nowCoords.latitude,
            longitude: nowCoords.longitude,
          }}
        />
      </MapView>
    </View>)
}
