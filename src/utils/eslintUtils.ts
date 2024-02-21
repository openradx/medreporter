import * as eslint from "eslint-linter-browserify"

const eslintLinter = new eslint.Linter()
const eslintConfig: eslint.Linter.Config = {
  parserOptions: { ecmaVersion: 2020, sourceType: "script" },
  env: { es2020: true },
  globals: { fields: "readonly" },
  rules: {
    semi: ["error", "never"],
  },
}
eslintLinter.getRules().forEach((desc: any, name: string) => {
  if (desc.meta.docs.recommended) eslintConfig.rules![name] = 2
})

export { eslintLinter, eslintConfig }
