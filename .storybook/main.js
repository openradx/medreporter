const path = require("path")

module.exports = {
  stories: ["../**/*.story.mdx", "../**/*.story.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-essentials",
    {
      name: "storybook-addon-turbo-build",
      options: { optimizationLevel: 2 },
    },
  ],
  framework: "@storybook/react",
  staticDirs: ["../locales"],
  webpackFinal: async (config) => {
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, "../")]

    return config
  },
}
