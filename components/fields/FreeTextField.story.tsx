import { ComponentMeta } from "@storybook/react"
import { FreeTextField } from "./FreeTextField"

export default {
  title: "Free text field",
  component: FreeTextField,
} as ComponentMeta<typeof FreeTextField>

export const Usage = () => <FreeTextField label="Free text field" />
