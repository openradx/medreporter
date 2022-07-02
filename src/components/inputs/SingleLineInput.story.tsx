import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { SingleLineInput } from "./SingleLineInput"

export default {
  title: "Free text input - single line",
  component: SingleLineInput,
} as ComponentMeta<typeof SingleLineInput>

const Template: ComponentStory<typeof SingleLineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")
  return <SingleLineInput value={value} onChange={setValue} {...{ label }} />
}

export const SingleLine = Template.bind({})
SingleLine.args = {
  label: "Free text input - single line",
}
