import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { MultilineInput } from "./MultilineInput"

export default {
  title: "Free text field - multiline",
  component: MultilineInput,
} as ComponentMeta<typeof MultilineInput>

const Template: ComponentStory<typeof MultilineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")
  return <MultilineInput value={value} onChange={setValue} {...{ label }} />
}

export const Multiline = Template.bind({})
Multiline.args = {
  label: "Free text field - multiline",
}
