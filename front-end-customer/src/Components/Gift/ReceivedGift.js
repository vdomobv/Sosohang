import styles from "./styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomModal from "../../Components/CustomModal/CustomModal";
import SubTitle from "../SubTitle/SubTitle";

export default function ReceivedGift({ data, usable, onPress }) {
  const isReviewAlready = data.sosoticonReviewStatus;
  // console.log("여기다", data.sosoticonReviewStatus);
  const [modalState, setModalState] = useState(false);
  const navigation = useNavigation();
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.person}>
              {data["sosoticonTakerName"]
                ? " from. " + data.sosoticonGiverName
                : " to. " + data.to}{" "}
            </Text>
            <Text style={styles.date}>
              {new Date(data.createdAt).toLocaleString()}
            </Text>
          </View>
          <View style={styles.body}>
            <Image style={styles.image} src={data.store.storeImage} />
            <View style={styles.contents}>
              <Text style={styles.shopName}>{data.store.storeName}</Text>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.price}>
                {data["sosoticonTakerName"]
                  ? "남은 금액 : " + numberWithCommas(data.sosoticonValue)
                  : numberWithCommas(data.sosoticonPrice)}{" "}
                원
              </Text>
            </View>
          </View>

          {data.to ? (
            <View style={styles.buttons}>
              {data.currentPrice == data.totalPrice ? (
                <CustomButton
                  pressFuction={() => {
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
                  navigation.navigate("Shop", { storeSeq: data.storeSeq });
                }}
              />
            </View>
          ) : (
            <View style={styles.buttons}>
              {!usable &&
                (isReviewAlready === 1 ? (
                  <CustomButton
                    content={"후기 남기기"}
                    pressFuction={() => {
                      navigation.navigate("Review", { giftData: data });
                    }}
                  />
                ) : (
                  <CustomButton
                    content={"후기 작성 완료"}
                    // 필요한 경우 pressFunction 또는 다른 props 추가
                  />
                ))}
            </View>
          )}
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
              <View style={styles.checkText}>
                <SubTitle
                  subTitle={"위 사항을 인지하였으며"}
                  customStyles={{
                    textAlign: "center",
                  }}
                />
                <SubTitle
                  subTitle={"선물 취소를 진행하시겠습니까?"}
                  customStyles={{
                    textAlign: "center",
                  }}
                />
              </View>
              <View style={styles.buttons}>
                <CustomButton
                  pressFuction={() => {
                    setModalState(false);
                  }}
                  content={"돌아가기"}
                  customStyles={{ backgroundColor: "#FFBF46" }}
                />
                <CustomButton content={"취소확인"} />
              </View>
            </>
          }
        />
      </TouchableOpacity>
    </>
  );
}
