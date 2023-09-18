import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white',
    marginTop: 25,
  },

  subcontainer: {
    marginVertical: 12,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },

  button: {
    backgroundColor: '#E9EEE8',
    width: 70,
    height: 50,
    padding: 10,
    borderRadius: 15,
    margin: 10,
    elevation: 10, // Add elevation for Android shadow
  },

  selectedButton: {
    backgroundColor: '#E6FEDA',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    paddingLeft: 10,
    margin: 10,
    marginHorizontal: 20,

    // width: '90%',
  },

});

export default styles