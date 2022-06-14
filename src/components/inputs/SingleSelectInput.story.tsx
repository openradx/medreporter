import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SingleSelectInput } from "./SingleSelectInput"

export default {
  title: "Single choice field - select",
  component: SingleSelectInput,
} as ComponentMeta<typeof SingleSelectInput>

const Template: ComponentStory<typeof SingleSelectInput> = ({
  label,
  value,
  onChange,
  options,
}) => <SingleSelectInput {...{ label, value, onChange, options }} />

export const Select = Template.bind({})
Select.args = {
  label: "Single choice field - select",
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
