import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { SingleRadioInput } from "./SingleRadioInput"

export default {
  title: "Single choice field - radio",
  component: SingleRadioInput,
} as ComponentMeta<typeof SingleRadioInput>

const Template: ComponentStory<typeof SingleRadioInput> = ({ label, options }) => {
  const [value, setValue] = useState<string>("")
  return <SingleRadioInput value={value} onChange={setValue} {...{ label, options }} />
}

export const Radio = Template.bind({})
Radio.args = {
  label: "Single choice field - radio",
  options: [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
  ],
}
