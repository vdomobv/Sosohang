import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function CarouselItem({ props, onPressFunction }) {
  // console.log('CarouselItem : ', props);
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.container}>
      <Image style={styles.imageStyle} source={props.image} />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.address}>{props.address}</Text>
    </TouchableOpacity>
  );
}
