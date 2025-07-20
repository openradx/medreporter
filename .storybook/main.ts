import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  stories: ["../src/components/**/*.(stories|story).@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook-community/storybook-dark-mode",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
}
export default config
