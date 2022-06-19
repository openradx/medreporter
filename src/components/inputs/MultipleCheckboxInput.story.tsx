import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { MultipleCheckboxInput } from "./MultipleCheckboxInput"

export default {
  title: "Multiple choice field - checkbox",
  component: MultipleCheckboxInput,
} as ComponentMeta<typeof MultipleCheckboxInput>

const Template: ComponentStory<typeof MultipleCheckboxInput> = ({ label, options }) => {
  const [value, setValue] = useState<string[]>([])

  return <MultipleCheckboxInput value={value} onChange={setValue} {...{ label, options }} />
}

export const Checkbox = Template.bind({})
Checkbox.args = {
  label: "Multiple choice field - checkbox",
  options: [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
  ],
}
