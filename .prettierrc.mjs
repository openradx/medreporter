/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: false,
  trailingComma: "es5",
  semi: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "@prettier/plugin-xml"],
  importOrder: ["^~", "^[./]"],
  overrides: [
    {
      files: "*.mdx",
      options: {
        printWidth: 70,
      },
    },
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

export default config
