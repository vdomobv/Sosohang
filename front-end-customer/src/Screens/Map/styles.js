import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: '#46C27D',
    opacity: 0.5,
    width: '75%',
    marginTop: 64,
    justifyContent: 'center',
    borderRadius : 20,
    paddingVertical : 20,
    alignSelf : 'center',
  },

  infoText: {
    zIndex: 2,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default styles;
