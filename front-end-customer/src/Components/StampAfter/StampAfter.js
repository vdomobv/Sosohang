import styles from "./styles";
import { Image } from "react-native";

export default function StampAfter() {
  return (
    <Image
      style={styles.stamp}
      source={require("assets/images/stamp.png")}
    ></Image>
  );
}
