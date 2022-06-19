import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { NumberInput } from "./NumberInput"

export default {
  title: "Number field",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = ({ label, min, max, precision, step }) => {
  const [value, setValue] = useState<number | null>(0)
  return <NumberInput value={value} onChange={setValue} {...{ label, min, max, precision, step }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Number field",
}
