import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MultipleCheckboxInput } from "./MultipleCheckboxInput"

export default {
  title: "Multiple choice field - checkbox",
  component: MultipleCheckboxInput,
} as ComponentMeta<typeof MultipleCheckboxInput>

const Template: ComponentStory<typeof MultipleCheckboxInput> = ({
  label,
  value,
  onChange,
  options,
}) => <MultipleCheckboxInput {...{ label, value, onChange, options }} />

export const Checkbox = Template.bind({})
Checkbox.args = {
  label: "Multiple choice field - checkbox",
  options: [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
  ],
}
