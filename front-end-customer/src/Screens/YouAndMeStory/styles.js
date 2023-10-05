import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginTop: 25,
  },

  title: {
    fontSize: 21,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  dayLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  horizontalLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "lightgrey",
    marginLeft: 20,
    marginRight: 15,
  },

  day: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },

  you: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  profileImage: {
    height: 55,
    width: 55,
    borderRadius: 100,
    borderColor: "lightgrey",
    borderWidth: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  time: {
    textAlign: 'right',
  },

  toolTip: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    height: 35,
    width: 250,
    marginVertical: 10,
    padding: 5,
  },

  cardImage: {
    alignItems: 'center', // 가로 중앙 정렬
    marginBottom: 10,
  },

  innerBox: {
    position: 'absolute',
    backgroundColor: '#F8F2CA',
    width: '60%',
    borderRadius: 8,
    marginBottom: 50,
    padding: 30,
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  messageText: {

  },

  innerInput: { 
    top: 178, 
    height: 90, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold'
  },

  // input: {
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 5,
  //   padding: 8,
  //   paddingLeft: 15,
  // },
  
});

export default styles