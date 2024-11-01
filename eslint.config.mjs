import path from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import eslintConfigMantine from "eslint-config-mantine"
// import eslintConfigNext from "eslint-config-next"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const config = tseslint.config(
  // ...eslintConfigNext,
  // ...compat.extends("next/core-web-vitals"),
  // ...compat.extends("plugin:@next/next/recommended"),
  // ...compat.extends("plugin:storybook/recommended"),
  // ...compat.extends("plugin:i18next/recommended"),
  // ...compat.extends("plugin:react-hooks/recommended"),
  // ...eslintConfigMantine,

  // ...compat.extends("next"),
  // ...compat.extends("next/typescript"),
  // ...compat.extends("prettier"),
  // {
  //   languageOptions: {
  //     parserOptions: {
  //       project: "./tsconfig.json",
  //     },
  //   },
  // },
  {
    rules: {
      // curly: "off",
      // "max-classes-per-file": "off",
      // "no-param-reassign": "off",
      // "no-restricted-syntax": "off",
      // "no-unreachable": "error",
      // "no-plusplus": "off",
      // "no-continue": "off",
      // "react/react-in-jsx-scope": "off",
      // semi: ["error", "never"],
      // quotes: "off",
      // "@typescript-eslint/semi": "off",
      // // "@typescript-eslint/quotes": [
      // //   "error",
      // //   "double",
      // //   {
      // //     avoidEscape: true,
      // //   },
      // // ],
      // "no-return-await": "off",
      // "@typescript-eslint/return-await": "off",
      // "@typescript-eslint/no-unused-vars": [
      //   "error",
      //   {
      //     argsIgnorePattern: "^_",
      //     varsIgnorePattern: "^_",
      //   },
      // ],
    },
  }
)

export default config
