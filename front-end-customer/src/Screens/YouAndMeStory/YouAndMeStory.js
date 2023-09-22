import styles from "./styles";
import { ScrollView, View, Text, Image } from "react-native";

import Tabs from "../../Components/Tabs/Tabs";

export default function YouAndMeStory({ route, navigation }) {
  const { toName } = route.params;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{toName}</Text>
          <View style={styles.dayLine}>
          <View style={styles.horizontalLine} />
          {/* 선물 날짜 */}
            <Text style={styles.day}>2023년 9월 7일</Text>
            <View style={styles.horizontalLine} />
            </View>
          <View style={styles.top}>
            <View style={styles.you} >
            <Image
            style={styles.image}
            source={require('assets/images/bread.png')}
          />
          <Text style={styles.name}>{toName}</Text>
            </View>
            {/* 선물 시간 */}
            <Text style={styles.time}>2023.09.07 12:41</Text>
          </View>

          <Text style={styles.toolTip}>선물과 메세지를 보냈어요! 💌</Text>
        
          <View style={styles.cardimage}>
            <Image
              source={require('assets/images/greencard.png')} // 이미지 파일의 경로
              style={{ width: '70%', height: 400, }}
            />

            <View style={[styles.innerBox, { top: 20, height: 150 }]}>
              <Image
                // source={selectedImage} // 선택된 이미지 표시
                // style={{ position: 'absolute', width: 200, height: 200 }}
              />
            </View>

            <View
              style={[styles.innerBox, styles.innerInput]}
              placeholder="메시지를 입력하세요."
            />


          </View>

        
        </View>
      </ScrollView>
      <Tabs navigation={navigation} />
    </>
  );
}

