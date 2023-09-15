import styles from "./styles";
import { View, Text, Image } from "react-native";

export default function Carousel({props}) {
    return (
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={props.image}/>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    );
  }
  
  