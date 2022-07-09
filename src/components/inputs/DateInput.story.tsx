import { ComponentMeta, ComponentStory } from "@storybook/react"
import "dayjs/locale/de"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { DateInput } from "./DateInput"

export default {
  title: "Inputs / DateInput",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = ({ label }) => {
  const [value, setValue] = useState<Date | null>(new Date())
  return (
    <InputLayout>
      <DateInput label={label} value={value} onChange={setValue} locale="de" />
    </InputLayout>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Study date",
}
