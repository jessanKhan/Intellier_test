// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const {
//   createSentryMetroSerializer,
// } = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },

  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg']
  }

  // serializer: {
  //   customSerializer: createSentryMetroSerializer()
  // }
};

module.exports = mergeConfig(defaultConfig, config);
