import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function CarouselItem({ props, onPressFunction }) {
  // console.log('CarouselItem : ', props);
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.container}>
      <Image style={styles.imageStyle} source={require('assets/images/bread.png')} />
      <Text style={styles.name}>{props.storeName}</Text>
      <Text style={styles.address}>{props.storeLocation}</Text>
    </TouchableOpacity>
  );
}
