module.exports = {
    env: {
      browser: true,
      node: true,
      commonjs: true,
      es2021: true,
      jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
    }
    },
    rules: {},
    settings: {
        react: {
            version: "detect"
            }
    },
      
  };
  