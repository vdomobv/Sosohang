import styles from "./styles";
import { Text, Image, TouchableOpacity } from "react-native";

export default function CarouselItem({ props, onPressFunction }) {
  // console.log('CarouselItem : ', props);
  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.container}>
      <Image style={styles.imageStyle} src={props.storeImage === 'string' ? "assets/images/bread.png" : props.storeImage } />
      <Text style={styles.name}>{props.storeName}</Text>
      <Text style={styles.address}>{props.storeLocation}</Text>
    </TouchableOpacity>
  );
}
