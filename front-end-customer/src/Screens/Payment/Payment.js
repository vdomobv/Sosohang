import IMP from "iamport-react-native";
import styles from "./styles";
import { Image, View, Text } from "react-native";
import Loading from "../../Components/Loading/Loading";
import { EXPO_PG_USER_CODE } from "@env";

export default function Payment({ navigation, route }) {
    const userCode = EXPO_PG_USER_CODE;
    const params = route.params.data;

    return <View style={styles.container}>
        <IMP.Payment
            userCode={userCode}
            loading={<Loading />}
            data={params}
            callback={(response) => console.log(response)} />
    </View>;
}
