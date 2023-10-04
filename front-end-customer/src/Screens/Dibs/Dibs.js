import styles from "./styles";
import { View, Text } from "react-native";

import Title from "../../Components/Title/Title";
import ScrollBox from "../../Components/ScrollBox/ScrollBox";
import Shop from "../../Components/Shop/Shop";

import { getDibData } from "../../Utils/DibAPI";
import { useEffect, useState } from "react";
import { getMemberSeq } from "../../Utils/MemberAPI";

export default function Dibs({ navigation }) {
  const [dibData, setDibData] = useState([]);
  const [tempUser, setTempUser] = useState();

  useEffect(() => {
    const fetchUserAndData = async () => {
      const memberSeq = await getMemberSeq();
      if (memberSeq !== undefined) {
        setTempUser(memberSeq);  // memberSeq 값을 상태로 설정
        
        // 이제 memberSeq 값을 사용하여 getDibData 호출
        const result = await getDibData(memberSeq);
        setDibData(result);
      }
    };

    fetchUserAndData();
  }, [])

  // console.log(dibData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDibData(tempUser);
      setDibData(result);
      // console.log(result);
    };

    if (dibData !== undefined && dibData.length > 0) {
      fetchData();
    }
  }, [dibData]);

  return (
    <View style={styles.container}>
      <Title title={"찜 목록"} />
      <ScrollBox content={dibData.map((d, index) => {
        return (<Shop key={index} data={d.store} dibSeq={d.dibSeq}
          PressFunction={() => {
            navigation.navigate('Shop', { storeSeq: d.store.storeSeq })
          }} />)
      })} />
    </View>

  );
}

