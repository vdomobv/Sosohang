import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        flex: 1
    },

    button: {
        width: '70%',
        borderRadius: 5,
        padding: 13,
        marginTop: 40,
        backgroundColor: '#46C27D',
        elevation: 5
      },

      buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },

    msg: {
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