import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor : 'white',
    padding : 5,
    margin : 5,
    borderRadius : 10,
  },
  
  checkBox: {
    height: 25,
    width: 25,
  },

  price: {
    fontSize : 15,
  },

  counter : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-evenly',
    paddingHorizontal: 40,
  },

  count: {
    fontSize : 16,
  },
  
  textBold : {
    fontWeight : 'bold',
    fontSize : 18,
    marginTop: 5,
  },

  circleIcon: {
    color: 'gray',
    fontSize: 28,
  }

});

export default styles