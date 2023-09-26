import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    marginStart: 'auto'
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  alertTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  
  alertText: {
    fontSize: 20,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 70,
    elevation: 2,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 50,
  },

});

export default styles;
