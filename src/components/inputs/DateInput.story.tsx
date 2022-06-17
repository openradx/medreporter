import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DateInput } from "./DateInput"

export default {
  title: "Date field",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = ({ label }) => {
  const [localValue, setValue] = useState(new Date())
  const onChangeInput = (inputValue: Date | null) => {
    setValue(inputValue as Date)
  }
  return <DateInput label={label} value={localValue} onChange={onChangeInput} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Date field",
}
