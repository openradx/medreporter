import { ComponentMeta, ComponentStory } from "@storybook/react"
import { DateField } from "./DateField"

export default {
  title: "Date field",
  component: DateField,
} as ComponentMeta<typeof DateField>

const Template: ComponentStory<typeof DateField> = ({ label }) => (
  <DateField label={label} />
)

export const Basic = Template.bind({})
Basic.args = {
  label: "Date field",
}
