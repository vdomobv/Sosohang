import styles from "./styles";
import { ScrollView } from "react-native";

export default function Carousel({ content }) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.container]}
    >
      {content}
    </ScrollView>
  );
}
