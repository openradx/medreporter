module.exports = {
  extends: [
    "mantine",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["testing-library", "jest", "react-hooks"],
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
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "never"],
    "@typescript-eslint/semi": "off",
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "no-return-await": "off",
    "@typescript-eslint/return-await": "off",
  },
}
