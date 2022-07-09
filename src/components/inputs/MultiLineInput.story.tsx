import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { MultiLineInput } from "./MultiLineInput"

export default {
  title: "Inputs  / MultiLineInput",
  component: MultiLineInput,
} as ComponentMeta<typeof MultiLineInput>

const Template: ComponentStory<typeof MultiLineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <MultiLineInput value={value} onChange={setValue} {...{ label }} />
    </InputLayout>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Additional findings",
}
