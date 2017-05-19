module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  'rules': {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    "no-console": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': ["error", {
      "arrays": "never",
      "objects": "never"
    }],
    "object-curly-spacing": ["error", "never", { "objectsInObjects": false }]
  }
}
