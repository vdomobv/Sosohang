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
    extra: {
      "eas": {
        "projectId": "b1c2b02c-95ab-42c1-aa28-f35f931fe849"
      }
    },
  },
};
