import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 25,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textInput: {
    backgroundColor: '#E9EEE8',
    borderRadius: 30,
    padding: 12,
    marginHorizontal: 10,
    fontSize: 23,
    fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }

});

export default styles;
