import styles from "./styles";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";

import Title from "../../Components/Title/Title";

export default function Map({ route }) {
  const nowCoords = route.params.nowCoords;

  return (
    <View style={styles.container}>
      <Title title={street ? street : district} />
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
    </View>)
}
