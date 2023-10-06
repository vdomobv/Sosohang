module.exports = {
  expo: {
    android: {
      package: "com.sosohang_owner.sosohang_owner",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_GOOGLE_API_KEY,
        },
      },
    },
    extra: {},
  },
};
