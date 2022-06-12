import { ComponentMeta, ComponentStory } from "@storybook/react"
import { FreeTextField } from "./FreeTextField"

export default {
  title: "Free text field",
  component: FreeTextField,
} as ComponentMeta<typeof FreeTextField>

const Template: ComponentStory<typeof FreeTextField> = ({ label, variant }) => (
  <FreeTextField label={label} variant={variant} />
)

export const Basic = Template.bind({})
Basic.args = {
  label: "Free text field",
}

export const Multiline = Template.bind({})
Multiline.args = {
  label: "Free text field",
  variant: "multiline",
}
