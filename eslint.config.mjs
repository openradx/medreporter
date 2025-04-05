import { FlatCompat } from "@eslint/eslintrc"
import i18next from "eslint-plugin-i18next"
import storybook from "eslint-plugin-storybook"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  ...storybook.configs["flat/recommended"],
  i18next.configs["flat/recommended"],
  {
    // ESLint specific rules
    // https://eslint.org/docs/latest/rules/
    rules: {
      "import/no-anonymous-default-export": "off",
      "no-console": "warn",
    },
  },
  {
    // TypeScript ESLint specific rules
    // https://typescript-eslint.io/rules/
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "none",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    // React specific rules
    rules: {
      "react/display-name": "off",
    },
  },
]

export default eslintConfig
