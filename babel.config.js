module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@': './src'
        }
      }
    ],
    'jest-hoist',
    // 'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  plugins: [
    'react-native-reanimated/plugin' //add this line
  ]
};
