import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { SingleLineInput } from "./SingleLineInput"

export default {
  title: "Inputs / SingleLineInput",
  component: SingleLineInput,
} as ComponentMeta<typeof SingleLineInput>

const Template: ComponentStory<typeof SingleLineInput> = ({ label }) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <SingleLineInput value={value} onChange={setValue} {...{ label }} />
    </InputLayout>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Additional findings",
}
