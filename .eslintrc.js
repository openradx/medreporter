module.exports = {
  extends: [
    "mantine",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["testing-library", "jest"],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "no-param-reassign": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "never"],
    "@typescript-eslint/semi": "off",
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
}
