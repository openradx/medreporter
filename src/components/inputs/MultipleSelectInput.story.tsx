import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { MultipleSelectInput } from "./MultipleSelectInput"

export default {
  title: "Multiple choice field - select",
  component: MultipleSelectInput,
} as ComponentMeta<typeof MultipleSelectInput>

const Template: ComponentStory<typeof MultipleSelectInput> = ({ label, options }) => {
  const [value, setValue] = useState<string[]>([])
  return <MultipleSelectInput value={value} onChange={setValue} {...{ label, options }} />
}
export const Select = Template.bind({})
Select.args = {
  label: "Multiple choice field - select",
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
