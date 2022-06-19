import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DateInput } from "./DateInput"

export default {
  title: "Date field",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = ({ label }) => {
  const [value, setValue] = useState<Date | null>(new Date())
  return <DateInput value={value} onChange={setValue} {...{ label }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Date field",
}
