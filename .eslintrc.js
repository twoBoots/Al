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
    'no-use-before-define': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
    'space-before-function-paren': ["error", "never"],
    'max-len': ["error", 140, 2],
    'no-useless-escape': 0,
    'arrow-body-style': ["error", "always"],
    'keyword-spacing': ["error", { "overrides": {
      "if": { "after": false },
      "for": { "after": false },
      "while": { "after": false },
      "switch": { "after": false}
    }}],
    'padded-blocks': ["error", { "switches": "never" }],
    'comma-spacing': ["warn", { "before": false, "after": true }],
    'comma-dangle': ["error", {
      "arrays": "never",
      "objects": "never"
    }],
    "object-curly-spacing": ["error", "never", { "objectsInObjects": false }]
  }
}
