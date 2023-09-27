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
        projectId: "f1801781-9cb8-4ea5-a341-4fcd34742946",
      },
    },
  },
};
