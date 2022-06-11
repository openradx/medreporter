module.exports = {
  stories: ["../**/*.story.mdx", "../**/*.story.@(js|jsx|ts|tsx)"],
  addons: [
    "storybook-dark-mode",
    "@storybook/addon-controls",
    {
      name: "storybook-addon-turbo-build",
      options: { optimizationLevel: 2 },
    },
  ],
  framework: "@storybook/react",
}
