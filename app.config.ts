export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: '#00463D',
        foregroundImage: './assets/heimApo/adaptive-icon.png',
      },
      edgeToEdgeEnabled: true,
      package: 'com.docmorris.heimapo',
    },
    icon: './assets/heimApo/icon.png',
    ios: {
      bundleIdentifier: 'com.docmorris.heimapo',
      deploymentTarget: '16.0',
      entitlements: {
        'com.apple.developer.healthkit': true,
      },
      infoPlist: {
        NSHealthShareUsageDescription: 'This app needs to save your ordered medications to HealthKit to help you track your health.',
        NSHealthUpdateUsageDescription: 'This app needs to save your ordered medications to HealthKit to help you track your health.',
      },
      supportsTablet: true,
    },
    name: 'Heim Apo',
    newArchEnabled: true,
    orientation: 'portrait',
    plugins: [
      [
        'expo-splash-screen',
        {
          backgroundColor: '#ffffff',
          image: './assets/heimApo/splash-icon.png',
          imageWidth: 250,
          resizeMode: 'contain',
        },
      ],
    ],
    scheme: 'heimapo',
    slug: 'heim-apo',
    userInterfaceStyle: 'light',
    version: '1.0.0',
  },
};
