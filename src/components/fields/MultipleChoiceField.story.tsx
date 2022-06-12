import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MultipleChoiceField } from "./MultipleChoiceField"

export default {
  title: "Multiple choice field",
  component: MultipleChoiceField,
} as ComponentMeta<typeof MultipleChoiceField>

const Template: ComponentStory<typeof MultipleChoiceField> = ({ label, variant, options }) => (
  <MultipleChoiceField label={label} variant={variant} options={options} />
)

export const Checkbox = Template.bind({})
Checkbox.args = {
  label: "Multiple choice field - checkbox",
  variant: "checkbox",
  options: [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
  ],
}

export const Select = Template.bind({})
Select.args = {
  label: "Multiple choice field - select",
  variant: "select",
  options: [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
    { value: "five", label: "Five" },
    { value: "six", label: "Six" },
    { value: "seven", label: "Seven" },
    { value: "eight", label: "Eight" },
  ],
}
