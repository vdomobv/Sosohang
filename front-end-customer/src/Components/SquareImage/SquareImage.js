import styles from "./styles";
import { Image } from "react-native";

export default function SquareImage({ imageSrc }) {
  return (
    <Image source={imageSrc} style={styles.image}/>
  )
}
