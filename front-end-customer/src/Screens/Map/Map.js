import styles from "./styles";
import { View, Text, Alert, TouchableOpacity, BackHandler } from "react-native";
import { useEffect, useState } from "react";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Postcode from "@actbase/react-daum-postcode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import Title from "../../Components/Title/Title";
import { geoCoding } from "../../Utils/Location";
import { getAllStoreData } from "../../Utils/StoreAPI";


export default function Map({ route, navigation }) {
  const storeData = route.params.storeData;
  const [nowCoords, setNowCoords] = useState(route.params.coords);
  const [nowLocation, setNowLocation] = useState(route.params.location);
  const [searching, setSearching] = useState(false);


  const fetchSecondCoords = async (address, location) => {
    await AsyncStorage.setItem("location", JSON.stringify(location));
    const secondCoords = await geoCoding(address);
    setNowCoords(secondCoords);
    setSearching(false);
  };

  useEffect(() => {
    const mapBackHandler = () => {
      if (searching) {
        setSearching(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "closeSearching",
      mapBackHandler
    );

    return () => backHandler.remove();
  }, [searching]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => {
            setSearching(true);
          }}
        >
          <Ionicons name="location-sharp" color={"#BFBFBF"} size={40} />
          <Title title={nowLocation} />
        </TouchableOpacity>
        <MapView
          // minZoomLevel={15}
          style={styles.map}
          region={{
            latitude: nowCoords.latitude,
            longitude: nowCoords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.001,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: nowCoords.latitude,
              longitude: nowCoords.longitude,
            }}
          />
          {storeData.length > 0 ?
            storeData.map((data) => {
              if (data.storeLatitude !== undefined && data.storeLongitude !== undefined) {
                return <Marker pinColor="#46C27D" key={data.storeSeq} coordinate={{ latitude: data.storeLatitude, longitude: data.storeLongitude }} />
              }
            })
            : undefined
          }
        </MapView>
        {!searching && <View style={styles.info} />}
        {!searching && (
          <Text style={styles.infoText}>
            상단 주소를 눌러 위치를 바꿔보세요.
          </Text>
        )}
      </View>
      {searching && (
        <Postcode
          style={{ width: "100%", height: "100%" }}
          onSelected={(data) => {
            setNowLocation(data.bname2);
            fetchSecondCoords(data.roadAddress, data.bname2);
          }}
        />
      )}
    </>
  );
}
