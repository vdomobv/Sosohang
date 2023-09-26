import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  
  qrContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 주변 화면 어둡게
  },
  
  qrText: {
    color: 'white',
    marginVertical: 10,
  },

  // qrBorder: {
  //   borderWidth: 3,
  //   borderColor: '#46C27D',
  //   borderRadius: 10,
  //   margin: 10,
  // },

  qr: {
    width: 400,
    height: 350,
  },
  
  scanAgain: {
    backgroundColor: '#46C27D',
    padding: 12,
    borderRadius: 10,
    margin: 10,
  },

  scanAgainText: {
    color: 'white',
    fontSize: 18,
  },
});

export default styles;
