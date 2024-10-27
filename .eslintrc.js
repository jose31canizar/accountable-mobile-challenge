module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: '@react-native-community',
  plugins: ['unused-imports'],
  rules: {
    curly: 0,
    'react/jsx-no-leaked-render': 2,
    'react-native/no-inline-styles': 0,
    'react/jsx-curly-brace-presence': [
      'error',
      {props: 'never', children: 'always'},
    ],
    'prettier/prettier': 0,
    '@typescript-eslint/no-unused-vars': ['error', {args: 'none'}],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': 'error',
  },
  globals: {
    localStorage: true,
    Buffer: true,
    jest: true,
  },
  overrides: [
    {
      files: ['gql-types.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
