import js from "@eslint/js"
import { Linter } from "eslint-linter-browserify"

export const eslintLinter = new Linter()

const errorRecommendedRules = Object.fromEntries(
  Object.entries(js.configs.recommended.rules).map(([rule, value]) => {
    if (Array.isArray(value)) {
      return [rule, [2, ...value.slice(1)]]
    }
    return [rule, 2]
  })
)

export const config: Linter.Config = {
  languageOptions: {
    parserOptions: { ecmaVersion: 2020, sourceType: "script" },
    globals: { fields: "readonly" },
  },
  rules: {
    semi: ["error", "never"],
    ...errorRecommendedRules,
  },
}
