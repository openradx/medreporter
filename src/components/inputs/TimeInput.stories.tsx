import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import "dayjs/locale/de"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { TimeInput } from "./TimeInput"

const meta: Meta<typeof TimeInput> = {
  title: "Inputs / TimeInput",
  component: TimeInput,
}

export default meta
type Story = StoryObj<typeof TimeInput>

const TimeInputWithState = ({
  label,
  extras,
  disabled,
  withSeconds,
}: ComponentProps<typeof TimeInput>) => {
  const [value, setValue] = useState<string>("")
  return (
    <InputLayout>
      <TimeInput value={value} onChange={setValue} {...{ label, extras, disabled, withSeconds }} />
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
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    disabled: false,
    withSeconds: false,
  },
}
