const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

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
    const plugins = config.resolve.plugins ?? []
    config.resolve.plugins = [...plugins, new TsconfigPathsPlugin()]
    return config
  },
}
