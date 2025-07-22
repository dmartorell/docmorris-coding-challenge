const { withInfoPlist, withEntitlementsPlist } = require('@expo/config-plugins');

const withHealthKit = (config) => {
  config = withInfoPlist(config, (config) => {
    config.modResults.NSHealthUpdateUsageDescription =
      config.modResults.NSHealthUpdateUsageDescription ||
      'This app needs to save your ordered medications to HealthKit to help you track your health.';

    config.modResults.NSHealthShareUsageDescription =
      config.modResults.NSHealthShareUsageDescription ||
      'This app needs to access your HealthKit data to provide personalized health insights.';

    return config;
  });

  config = withEntitlementsPlist(config, (config) => {
    config.modResults['com.apple.developer.healthkit'] = true;
    return config;
  });

  return config;
};

module.exports = withHealthKit;
