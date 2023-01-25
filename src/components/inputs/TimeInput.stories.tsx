import { Meta, StoryObj } from "@storybook/react"
import "dayjs/locale/de"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { TimeInput } from "./TimeInput"

const meta: Meta<typeof TimeInput> = {
  title: "Inputs / TimeInput",
  component: TimeInput,
}

export default meta
type Story = StoryObj<typeof TimeInput>

const TimeInputWithState = ({ label, format }: ComponentProps<typeof TimeInput>) => {
  const [value, setValue] = useState<Date | null>(new Date())
  return (
    <InputLayout>
      <TimeInput label={label} value={value} onChange={setValue} format={format} />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <TimeInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Study time",
    format: "24",
  },
}
