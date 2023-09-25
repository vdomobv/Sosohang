import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "white",
  },

  image: {
    width: '100%',
    height: 250,
    objectFit: 'fill'
  },

  head: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  keywords: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  content: {
    marginHorizontal: 15,
    marginVertical: 10,
  },

  button: {
    height: 50,
    position: 'absolute',
    width: '95%',
    height : '',
    bottom: 0,
    marginVertical: 10,
    alignSelf: 'center',
  },

  blank : {
    height : 60
  },

  text : {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 30
  }

});

export default styles