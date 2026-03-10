module.exports = {
  dependencies: {
    // Prevent nested autolinking from this library package.
    // Host apps should link these packages directly.
    'react-native-keyboard-controller': {
      platforms: {
        android: null,
        ios: null,
      },
    },
    'react-native-reanimated': {
      platforms: {
        android: null,
        ios: null,
      },
    },
    'react-native-worklets': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
