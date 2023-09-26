import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },

  subContainer: {

  },

  stampImage: {
    marginStart: 'auto',
    top: 45,
    zIndex: 100,
    width: 90,
    height: 90,
    marginRight: 10,
  },

  stampBox: {
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#FFBF46",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    width: "99%",
    paddingVertical: 30,
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
    padding: 10,
    marginVertical: 10,
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 30,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop : 10,
  },

  button: {
    width: '80%',
    borderRadius: 5,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#FFBF46',
    elevation: 5
  },

  buttonText: {
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }
});

export default styles;
