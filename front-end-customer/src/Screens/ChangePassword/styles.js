import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // marginTop: 25,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    marginBottom: 60,
    fontWeight: 'bold', 
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    paddingLeft: 10,
    margin: 10,
    width: '80%',
  },

  button: {
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  },

});

export default styles