import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function CarouselItem({ props, onPressFunction }) {
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.container}>
      <Image style={styles.imageStyle} src={props.storeImage} />
      <Text style={styles.name}>{props.storeName}</Text>
      <Text style={styles.address}>{props.storeLocation}</Text>
    </TouchableOpacity>
  );
}
