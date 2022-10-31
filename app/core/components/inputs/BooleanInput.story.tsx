import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { BooleanInput } from "./BooleanInput"

export default {
  title: "Inputs / BooleanInput",
  component: BooleanInput,
} as ComponentMeta<typeof BooleanInput>

const Template: ComponentStory<typeof BooleanInput> = ({ label }) => {
  const [value, setValue] = useState(false)

  return <BooleanInput value={value} onChange={setValue} {...{ label }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Pneumothorax",
}
