import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white',
    marginTop: 25,
  },

  // subcontainer: {
  //   marginVertical: 12,
  // },

  title: {
    fontSize: 21,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
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
    height: 45,
    padding: 8,
    borderRadius: 15,
    margin: 10,
    elevation: 5, // Android shadow
  },

  selectedButton: {
    backgroundColor: '#E6FEDA',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardImage: {
    alignItems: 'center', // 가로 중앙 정렬
    marginTop: 10,
  },

  innerBox: {
    position: 'absolute',
    backgroundColor: '#F8F2CA',
    width: '80%',
    borderRadius: 8,
    marginBottom: 50,
    padding: 30,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  innerInput: { 
    top: 250, 
    height: 150, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold'
  },

});

export default styles