import styles from "./styles";
import { Text, Image, TouchableOpacity } from "react-native";

export default function CarouselItem({ props, onPressFunction }) {
  // console.log('CarouselItem : ', props);
  const storeImage = props.storeImage;

  return (
    <TouchableOpacity onPress={onPressFunction} style={styles.container}>
      <Image style={styles.imageStyle} source={storeImage === 'string' ? require("assets/images/bread.png") : { uri: storeImage }} />
      <Text style={styles.name}>{props.storeName}</Text>
      <Text style={styles.address}>{props.storeLocation}</Text>
    </TouchableOpacity>
  );
}
