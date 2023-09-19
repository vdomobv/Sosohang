import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },

  section1: {
    justifyContent : 'space-around',
    flexDirection: "row",
    margin : 10
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    borderRadius: 100,
    borderColor: 'lightgrey',
    borderWidth: 1,
    width: 70,
    height: 70,
  },

  stamp: {
    borderRadius: 100,
    width: 75,
    height: 75,
  },

  user : {
    marginLeft : 10
  },

  name : {
    fontWeight : 'bold',
    fontSize : 20
  },

  phone : {
    fontSize : 18
  },

  header : {
    marginHorizontal : 20,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
  },

  carouselContainer : {
    flexDirection: "row",
    marginLeft : 10
  },

  section2: {
    marginLeft : 10
  },

  

  
});

export default styles