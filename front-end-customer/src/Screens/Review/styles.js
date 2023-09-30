import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },

  scrollBoxContainer: {
    padding: 20,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  reviewBox: {
    backgroundColor: "#fff",
    margin: 5,
    marginHorizontal: 22,
    padding: 30,
    borderRadius: 10,
    textAlign: "center",
  },

  reviewInfo: {
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    // backgroundColor: '#E6FEDA',
    backgroundColor: '#46C27D',
    height: 40,
    padding: 5,
    borderRadius: 30,
    margin: 10,
    // elevation: 5, // Android shadow
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    // fontWeight: 'bold',
    color:'white'
  },


});

export default styles