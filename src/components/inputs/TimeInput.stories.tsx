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

const TimeInputWithState = ({ label, withSeconds }: ComponentProps<typeof TimeInput>) => {
  const [value, setValue] = useState<string>("")
  return (
    <InputLayout>
      <TimeInput label={label} value={value} onChange={setValue} withSeconds={withSeconds} />
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
    withSeconds: false,
  },
}
