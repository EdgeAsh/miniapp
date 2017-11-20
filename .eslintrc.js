module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      "never"
    ],
    "space-before-function-paren": ["error", "never"],
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': "off"
  }
};