import { ComponentMeta, ComponentStory } from "@storybook/react"
import { NumberField } from "./NumberField"

export default {
  title: "Number field",
  component: NumberField,
} as ComponentMeta<typeof NumberField>

const Template: ComponentStory<typeof NumberField> = ({ label }) => <NumberField label={label} />

export const Basic = Template.bind({})
Basic.args = {
  label: "Number field",
}
