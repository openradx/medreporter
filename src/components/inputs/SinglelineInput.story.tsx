import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { SinglelineInput } from "./SinglelineInput"

export default {
  title: "Free text field - singleline",
  component: SinglelineInput,
} as ComponentMeta<typeof SinglelineInput>

const Template: ComponentStory<typeof SinglelineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")
  return <SinglelineInput value={value} onChange={setValue} {...{ label }} />
}

export const Singleline = Template.bind({})
Singleline.args = {
  label: "Free text field - singleline",
}
