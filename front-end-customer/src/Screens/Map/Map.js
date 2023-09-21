import styles from "./styles";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Postcode from '@actbase/react-daum-postcode';

import Title from "../../Components/Title/Title";
import { geoCoding } from "../../Utils/Location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Map({ route }) {
  const [nowCoords, setNowCoords] = useState(route.params.coords);
  const [nowLocation, setNowLocation] = useState(route.params.location);
  const [searching, setSearching] = useState(false);

  const fetchSecondCoords = async (address, location) => {
    await AsyncStorage.setItem("location", JSON.stringify(location))
    const secondCoords = await geoCoding(address);
    setNowCoords(secondCoords);
    setSearching(false);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { setSearching(true); }}>
          <Title title={nowLocation} />
        </TouchableOpacity>
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
      </View>
      {searching && <Postcode
        style={{ width: '100%', height: '100%' }}
        onSelected={data => {
          setNowLocation(data.bname2);
          fetchSecondCoords(data.roadAddress, data.bname2);
        }}
      />}
    </>)
}
