import styles from "./styles";
import { Image, TouchableOpacity } from "react-native";
import { addDib, removeDib } from "../../Utils/DibAPI";

export default function DibButton({ userSeq, storeSeq, dibState, setDibState }) {
     return (
        <TouchableOpacity
            onPress={() => {
                if (dibState) {
                    removeDib(userSeq, storeSeq);
                } else {
                    addDib(userSeq, storeSeq);
                }
                setDibState(!dibState);
            }}
        >
            <Image
                style={styles.image}
                source={
                    dibState
                        ? require("assets/images/heart.png")
                        : require("assets/images/empty_heart.png")
                }
            />
        </TouchableOpacity>
    )
}