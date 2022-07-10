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
  staticDirs: ["../src/locales"],
}
