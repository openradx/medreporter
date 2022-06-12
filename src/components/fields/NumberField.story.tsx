import { ComponentMeta, ComponentStory } from "@storybook/react"
import { NumberField } from "./NumberField"

export default {
  title: "Number field",
  component: NumberField,
} as ComponentMeta<typeof NumberField>

const Template: ComponentStory<typeof NumberField> = ({ label, min, max, precision, step }) => (
  <NumberField label={label} min={min} max={max} precision={precision} step={step} />
)

export const Basic = Template.bind({})
Basic.args = {
  label: "Number field",
}
