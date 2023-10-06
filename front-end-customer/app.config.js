module.exports = {
  expo: {
    android: {
      package: "com.sosohang.sosohang",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_GOOGLE_API_KEY,
        },
      },
    },
    extra: {
      eas: {
        projectId: "0603cfd4-e70d-4b00-bb3a-dfffc9305187",
      },
    },
  },
};
