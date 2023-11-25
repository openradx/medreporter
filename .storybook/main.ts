import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  stories: ["../src/components/**/*.(stories|story).@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../locales"],
  docs: {
    autodocs: "tag",
  },
}
export default config
