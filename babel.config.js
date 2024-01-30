module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            tests: ['./tests/'],
            "@common": "./src/common",
          }
        }
      ],
      ['module:react-native-dotenv'],
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-export-namespace-from',
    ],
  };
};

