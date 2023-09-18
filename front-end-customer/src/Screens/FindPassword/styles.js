import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 25,
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
    margin: 5,
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

  minibutton: {
    width: '15%',
    borderRadius: 5,
    padding: 11,
    backgroundColor: '#46C27D',
    marginLeft: 5
  },

});

export default styles