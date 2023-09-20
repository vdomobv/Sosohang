import styles from "./styles";
import { View, Text, Image } from "react-native";

import CustomButton from "../../Components/CustomButton/CustomButton";

export default function Gift({ navigation, data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.person}>
          {data["from"] ? " from. " + data.from : " to. " + data.to}{" "}
        </Text>
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
      <View style={styles.body}>
        <Image style={styles.image} source={data.image} />
        <View style={styles.contents}>
          <Text style={styles.shopName}>{data.shopname}</Text>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>
            {data["from"] ? "남은 금액 : " + data.currentPrice : data.totalPrice} 원
          </Text>
        </View>
      </View>
      {data.to ? (
        <View style={styles.buttons}>
          {data.currentPrice == data.price ? (
            <CustomButton
              pressFuction={() => {
                console.log("취소하기 기능");
              }}
              content={"취소하기"}
              customStyles={{ backgroundColor: "#FFBF46" }}
            />
          ) : (
            <CustomButton
              content={"취소하기"}
              disabled={true}
              customStyles={{ backgroundColor: "#BFBFBF" }}
            />
          )}
          
          <CustomButton
            navigation={navigation}
            content={"재주문"}
            pressFuction={() => {
              navigation.navigate("MakeCard", { selectedProducts: data });
            }}
          />
        </View>
      ) : undefined}
    </View>
  );
}
