import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 25,
  },

  info: {
    textAlign: 'right',
    fontSize: 16,
    marginTop: 40,
    marginRight: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 12,
    margin: 5,
    marginVertical: 8,
    width: '80%',
    fontSize: 18,
  },

  button: {
    width: '80%',
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#46C27D',
    elevation: 5
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }
});

export default styles