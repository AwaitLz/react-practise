module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': 'off',
    'no-console': ['off'],
    'no-debugger': ['off'],
    'import/no-unresolved': ['off'],
    'comma-dangle': ['off'],
    'react/no-find-dom-node': ['off'],
    'no-undef': ['off'],
    'no-unused-vars': ['warn'],
    'react/display-name': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'no-empty': ['off'],
    complexity: ['error', 30],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'no-useless-escape': [0],
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-globals': 'off',
    'react/default-props-match-prop-types': ['off'],
    '@typescript-eslint/no-var-requires': 'off',
    'react/require-default-props': 'off'
  }
};
