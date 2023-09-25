import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },

  info: {
    textAlign: 'right',
    marginTop: 40,
    marginRight: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    margin: 5,
    width: '80%',
  },

  button: {
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }
});

export default styles