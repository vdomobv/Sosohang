import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },

    button: {
        height: "9%",
        width: "80%",
        alignSelf : 'center',
        marginTop : 80,
        textAlignVertical : 'center',
    },

    image: {
        alignItems: "center",
        marginTop : 250
      },

    text: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlignVertical: 'center',
        color: "white"
    }

});

export default styles