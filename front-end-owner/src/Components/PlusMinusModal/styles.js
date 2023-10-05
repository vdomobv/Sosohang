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
    marginBottom: 18,
    textAlign: 'center',
  },

  alertTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },

  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  alertText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFBF46",
  },

  icons: {
    color: 'gray',
    fontSize: 35,
    marginHorizontal: 10,
  },

  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 3,
    marginHorizontal: 70,
    marginTop: 10,
    elevation: 2,
    backgroundColor: '#46C27D',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 40,
  },

});

export default styles;
