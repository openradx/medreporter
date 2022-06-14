import { ComponentMeta, ComponentStory } from "@storybook/react"
import { DateInput } from "./DateInput"

export default {
  title: "Date field",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = ({ label, value, onChange }) => (
  <DateInput label={label} value={value} onChange={onChange} />
)

export const Basic = Template.bind({})
Basic.args = {
  label: "Date field",
}
