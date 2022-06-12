import { ComponentMeta, ComponentStory } from "@storybook/react"
import { FreeTextField } from "./FreeTextField"

export default {
  title: "Free text field",
  component: FreeTextField,
} as ComponentMeta<typeof FreeTextField>

const Template: ComponentStory<typeof FreeTextField> = ({ label, variant }) => (
  <FreeTextField label={label} variant={variant} />
)

export const Singleline = Template.bind({})
Singleline.args = {
  label: "Free text field - singleline",
}

export const Multiline = Template.bind({})
Multiline.args = {
  label: "Free text field - multiline",
  variant: "multiline",
}
