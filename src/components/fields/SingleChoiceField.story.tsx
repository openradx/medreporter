import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SingleChoiceField } from "./SingleChoiceField"

export default {
  title: "Single choice field",
  component: SingleChoiceField,
} as ComponentMeta<typeof SingleChoiceField>

const Template: ComponentStory<typeof SingleChoiceField> = ({ label, variant, options }) => (
  <SingleChoiceField label={label} variant={variant} options={options} />
)

export const Radio = Template.bind({})
Radio.args = {
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
