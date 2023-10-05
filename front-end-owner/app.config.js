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
        projectId: "baff951f-d87e-46e1-9c07-10d7173b8e41",
      },
    },
  },
};
