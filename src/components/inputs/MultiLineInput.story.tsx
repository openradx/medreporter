import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { MultiLineInput } from "./MultiLineInput"

export default {
  title: "Free text input - multiline",
  component: MultiLineInput,
} as ComponentMeta<typeof MultiLineInput>

const Template: ComponentStory<typeof MultiLineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")
  return <MultiLineInput value={value} onChange={setValue} {...{ label }} />
}

export const MultiLine = Template.bind({})
MultiLine.args = {
  label: "Free text input - multiline",
}
