import styles from "./styles";
import { View, Text, } from "react-native";


export default function MakeCard({ route, navigation }) {
console.log(route.params.selectedProducts);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>선물포장하기</Text>
        <Text style={styles.subtitle}>메시지카드 작성</Text>
        
        <Text style={styles.subtitle}>보내는 사람</Text>

        <Text style={styles.subtitle}>받는 사람</Text>
        
        <Text style={styles.subtitle}>상품 내역</Text>
        
      </View>
    </>
  );
}

