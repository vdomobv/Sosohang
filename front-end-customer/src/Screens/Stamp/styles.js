import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },

  subtitle: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
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

  stampCount: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFBF46",
  },

  stampTotal: {
    fontSize: 28,
    color: "#818181",
  },

  stampImage: {
    margin: 20,
  },

  infoText: {
    fontSize: 16,
    color: "#818181",
    marginLeft : 15,
    marginVertical : 5,
  },

  info: {
    marginVertical : 5,
  },
});

export default styles;
