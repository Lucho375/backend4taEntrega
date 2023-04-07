module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'error',
    'no-useless-catch': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'prefer-const': 'off'
  }
}
