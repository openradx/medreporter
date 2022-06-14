import { ComponentMeta, ComponentStory } from "@storybook/react"
import { NumberInput } from "./NumberInput"

export default {
  title: "Number field",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = ({
  label,
  min,
  max,
  precision,
  step,
  onChange,
  value,
}) => <NumberInput {...{ label, value, onChange, min, max, precision, step }} />

export const Basic = Template.bind({})
Basic.args = {
  label: "Number field",
}
