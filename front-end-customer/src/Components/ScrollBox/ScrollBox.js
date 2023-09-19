import styles from "./styles";
import { View, Text, ScrollView } from "react-native";

export default function ScrollBox({content}) {
    return (
      <ScrollView style={styles.container}>
        {content}
      </ScrollView>
    );
  }
  
  