module.exports = {
  parserOptions: {
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2020,
    // Allows for the use of imports
    sourceType: "module",
  },
  extends: [
    // "plugin:@typescript-eslint/recommended",
    // "prettier/@typescript-eslint",
    // Enables vue 3 recommended settings
    "plugin:vue/vue3-recommended",
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors and as well ESLint errors.
    "plugin:prettier/recommended",
    // Add specific prettier vue config
    "prettier/vue",
  ],
  // Additional rules
  rules: {},
}
