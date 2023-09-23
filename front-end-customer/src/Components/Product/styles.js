import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },

    content: {
        justifyContent: 'space-evenly',
        marginHorizontal : 10,
        flex : 1
    },

    amount : {
        alignSelf : 'center',
    },

    checkbox : {
        alignSelf: 'center',
        backgroundColor : '#E9EEE8',
        borderWidth : 0.5
    },

    prevPrice : {
        color : '#575761',
        textDecorationLine: 'line-through'
    }
})

export default styles;