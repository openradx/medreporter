import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { SingleRadioInput } from "./SingleRadioInput"

export default {
  title: "Inputs / SingleRadioInput",
  component: SingleRadioInput,
} as ComponentMeta<typeof SingleRadioInput>

const Template: ComponentStory<typeof SingleRadioInput> = ({ label, options }) => {
  const [value, setValue] = useState<string | null>(null)

  return <SingleRadioInput value={value} onChange={setValue} {...{ label, options }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Pneumothorax side",
  options: [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
    { value: "both", label: "Both sides" },
  ],
}
