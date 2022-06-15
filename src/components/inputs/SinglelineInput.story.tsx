import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SinglelineInput } from "./SinglelineInput"

export default {
  title: "Free text field - singleline",
  component: SinglelineInput,
} as ComponentMeta<typeof SinglelineInput>

const Template: ComponentStory<typeof SinglelineInput> = ({ label, value, onChange }) => (
  <SinglelineInput {...{ label, value, onChange }} />
)

export const Singleline = Template.bind({})
Singleline.args = {
  label: "Free text field - singleline",
}
