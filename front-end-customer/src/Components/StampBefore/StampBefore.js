import styles from "./styles";
import { Image } from "react-native";

export default function StampBefore() {
  return (
    <Image
      style={styles.stamp}
      source={require("assets/images/stamp_before.png")}
    ></Image>
  );
}
