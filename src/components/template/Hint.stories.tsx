import { Meta, StoryObj } from "@storybook/nextjs"
import { Hint } from "./Hint"

const meta: Meta<typeof Hint> = {
  title: "Template / Hint",
  component: Hint,
}

export default meta
type Story = StoryObj<typeof Hint>

export const Info: Story = {
  args: {
    level: "info",
    content: "This is an informative hint",
    hidden: false,
  },
}

export const Warning: Story = {
  args: {
    level: "warning",
    content: "This is a warning hint",
    hidden: false,
  },
}

export const Error: Story = {
  args: {
    level: "error",
    content: "This is an error hint",
    hidden: false,
  },
}
