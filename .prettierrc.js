module.exports = {
  singleQuote: false,
  semi: false,
  printWidth: 100,
  trailingComma: "es5",
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("@prettier/plugin-xml"),
  ],
  importOrder: ["^~", "^[./]"],
  overrides: [
    {
      files: "*.svg",
      options: {
        printWidth: Number.MAX_SAFE_INTEGER,
        singleAttributePerLine: false,
        xmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
}
