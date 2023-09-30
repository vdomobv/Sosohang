import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({
  navigation,
  content,
  fontcolor = "white",
  customStyles,
  pressFuction,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={pressFuction}
      disabled={disabled}
    >
      <Text style={[styles.content, { color: fontcolor }]}>{content}</Text>
    </TouchableOpacity>
  );
}
