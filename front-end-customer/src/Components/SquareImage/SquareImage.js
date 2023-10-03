import styles from "./styles";
import { Image } from "react-native";

export default function SquareImage({ imageSrc }) {
  return (
    <Image src={imageSrc} style={styles.image}/>
  )
}
