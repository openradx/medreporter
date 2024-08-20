import * as eslint from "eslint-linter-browserify"

export const eslintLinter = new eslint.Linter()

export const config: eslint.Linter.Config = {
  parserOptions: { ecmaVersion: 2020, sourceType: "script" },
  env: { es2020: true },
  globals: { fields: "readonly" },
  rules: {
    semi: ["error", "never"],
  },
}

eslintLinter.getRules().forEach((desc: any, name: string) => {
  if (desc.meta.docs.recommended) config.rules![name] = 2
})
