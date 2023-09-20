import styles from "./styles";
import { View, Text, Image } from "react-native";
import { useState } from "react";

import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomModal from "../../Components/CustomModal/CustomModal";

export default function Gift({ navigation, data }) {
  const [modalState, setModalState] = useState(false);

  return (
    <>
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
              {data["from"]
                ? "남은 금액 : " + data.currentPrice
                : data.totalPrice}{" "}
              원
            </Text>
          </View>
        </View>
        {data.to ? (
          <View style={styles.buttons}>
            {data.currentPrice == data.price ? (
              <CustomButton
                pressFuction={() => {
                  console.log("취소하기");
                  setModalState(true);
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
      <CustomModal
        modalState={modalState}
        content={
          <>
              <Text style={styles.modalText}>
                🚨 선물 취소 시, 선물 받은 친구에게 문자 및 알람이 전송됩니다.
              </Text>
              <Text style={styles.modalText}>
                🚨 선물 전체 사용 및 분할 사용 시, 선물 취소는 더이상
                불가능합니다.
              </Text>
              <Text style={styles.modalText}>
                🚨 환불은 결제수단에 따라 환불 소요 기간이 약 2 ~ 3일 이상
                소요될 수 있습니다.
              </Text>
            <View style={styles.buttons}>
              <CustomButton
              pressFuction={() => {setModalState(false)}}
                content={"돌아가기"}
                customStyles={{ backgroundColor: "#FFBF46" }}
              />
              <CustomButton content={"취소확인"} />
            </View>
          </>
        }
      />
    </>
  );
}
