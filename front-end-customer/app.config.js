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
    },
  },
};
