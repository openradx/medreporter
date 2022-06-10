module.exports = {
  ...require("eslint-config-mantine/.prettierrc.js"),
  singleQuote: false,
  semi: false,
  printWidth: 100,
  importOrder: ["^app[./](.*)$", "^[./]"],
}
