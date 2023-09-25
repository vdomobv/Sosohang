// components
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

import Title from "../../Components/Title/Title";
import SubTitle from "../../Components/SubTitle/SubTitle";
import Box from "../../Components/Box/Box";
import Tabs from "../../Components/Tabs/Tabs";
import StampListDummy from "../../Dummys/MyStamps/StampListDummy";

export default function AddStamp({ route, navigation }) {
  // const stamp = route.params.stamp;
  // const image = route.params.image;
  // const stampList = StampListDummy.map((data) => {
  //   return <Coupon data={data} navigation={navigation} />;
  // });

  const handleStamp = () => {
  }
  
  return (
    <>
      <View style={styles.container}>
        <Title title={"소복소복 도장"} />
        <View style={styles.subtitle}>
          {/* <Title title={stamp.shopname} /> */}
          <Title title={"상점 이름"} />
        </View>
        <Box
          content={
            <View style={styles.stampBox}>
              <SubTitle subTitle={"현재 적립 소복소복"} customStyles={{ color: "#FFBF46" }} />
              <Text style={styles.stampCount}>
                {/* {stamp.stamp} */}
                <Text style={styles.stampTotal}>/10</Text>
              </Text>
              {/* <Image style={styles.stampImage} source={image} /> */}
            </View>
          }
        />
        <View style={styles.info}>
          <Box
            content={
              <>
                <Text style={[styles.infoText, { marginTop: 15 }]}>
                ◾ 소복소복 10개 적립 시, 해당 상점 쿠폰 발행
                </Text>
                <Text style={styles.infoText}>
                ◾ 적립 기준은 상점마다 상이할 수 있습니다.
                </Text>
                <Text style={[styles.infoText, { marginBottom: 15 }]}>
                ◾ 타 상점과 함께 사용 불가합니다.
                </Text>
              </>
            }
          />
        </View>
<View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button]}
            onPress={handleStamp}>
            <Text style={[styles.buttonText]}>
              적립하기
            </Text>
          </TouchableOpacity>
          </View>

      </View>
      <Tabs navigation={navigation} />
    </>
  );
}
