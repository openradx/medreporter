import { Meta, StoryObj } from "@storybook/react"
import "dayjs/locale/de"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { DateInput } from "./DateInput"

const meta: Meta<typeof DateInput> = {
  title: "Inputs / DateInput",
  component: DateInput,
}

export default meta
type Story = StoryObj<typeof DateInput>

const DateInputWithState = ({ label }: ComponentProps<typeof DateInput>) => {
  const [value, setValue] = useState<Date | null>(new Date())
  return (
    <InputLayout>
      <DateInput label={label} value={value} onChange={setValue} locale="de" />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <DateInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Study date",
  },
}
