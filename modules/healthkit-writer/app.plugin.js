// modules/healthkit-writer/app.plugin.js (UPDATED)

const { withInfoPlist, withXcodeProject } = require('@expo/config-plugins');

const withHealthKit = (config) => {
  // 1. Add Info.plist entries for HealthKit usage descriptions
  config = withInfoPlist(config, (config) => {
    // Required: Explains why you need to write health data
    config.modResults.NSHealthUpdateUsageDescription =
      config.modResults.NSHealthUpdateUsageDescription ||
      'This app needs to save your ordered medications to HealthKit to help you track your health.';

    // Required: Explains why you need to read health data (even if not reading, often good to include)
    config.modResults.NSHealthShareUsageDescription =
      config.modResults.NSHealthShareUsageDescription ||
      'This app needs to access your HealthKit data to provide personalized health insights.';

    return config;
  });

  // 2. Add HealthKit capability to the Xcode project
  config = withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;

    const targetUuid = xcodeProject.findTargetKey(config.modRequest.projectName);
    if (!targetUuid) {
      throw new Error('Xcode target not found.');
    }

    // Add HealthKit capability
    xcodeProject.addCapability(targetUuid, 'com.apple.HealthKit', {
    });

    return config;
  });

  return config;
};

module.exports = withHealthKit;