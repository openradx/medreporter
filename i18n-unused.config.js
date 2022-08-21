const fs = require("fs")
const yaml = require("js-yaml")

module.exports = {
  localesPath: "./locales",
  srcPath: "./app",
  ignorePaths: ["./node_modules"],
  localesExtensions: ["yml"],
  localeFileLoader: (filePath) => {
    return yaml.load(fs.readFileSync(filePath, "utf8"))
  },
  translationKeyMatcher: /\b(_|t|tc|i18nKey)\(.*?\)/gi,
}
