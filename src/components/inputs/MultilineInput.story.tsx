import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MultilineInput } from "./MultilineInput"

export default {
  title: "Free text field - multiline",
  component: MultilineInput,
} as ComponentMeta<typeof MultilineInput>

const Template: ComponentStory<typeof MultilineInput> = ({ label, value, onChange }) => (
  <MultilineInput {...{ label, value, onChange }} />
)

export const Multiline = Template.bind({})
Multiline.args = {
  label: "Free text field - multiline",
}
