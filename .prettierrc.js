module.exports = {
  ...require("eslint-config-mantine/.prettierrc.js"),
  singleQuote: false,
  semi: false,
  printWidth: 100,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^db", "^app/", "^[./]"],
}
