module.exports = function (api) {
  api.cache(false); // babel caches old env variables when switching envs
  return {
    presets: ['module:metro-react-native-babel-preset'],
    overrides: [{
      "plugins": [
        ["@babel/plugin-transform-private-methods", {
        "loose": true
      }]
      ]
    }],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            App: './App',
            utils: './src/utils',
            theme: './src/theme',
            components: './src/components',
            store: './src/store',
            assets: './src/assets',
            api: './src/api',
            context: './src/context',
            containers: './src/containers',
            hooks: './src/hooks',
            screens: './src/screens',
            types: './src/types',
          },
        },
      ],
      ['@babel/plugin-proposal-optional-chaining', {loose: false}],
      ['module:react-native-dotenv', {envName: 'ENV', moduleName: '@env'}],
    ],
  };
};
