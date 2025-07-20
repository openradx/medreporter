import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { FindingInput } from "./FindingInput"

const meta: Meta<typeof FindingInput> = {
  title: "Inputs / FindingInput",
  component: FindingInput,
}

export default meta
type Story = StoryObj<typeof FindingInput>

const FindingInputWithState = ({
  label,
  extras,
  direction,
  disabled,
  children,
}: ComponentProps<typeof FindingInput>) => {
  const [value, setValue] = useState(false)

  return (
    <FindingInput value={value} onChange={setValue} {...{ label, extras, direction, disabled }}>
      <div>{children}</div>
    </FindingInput>
  )
}

const Template: Story = {
  render: (props) => <FindingInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pleural effusion",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    direction: "row",
    disabled: false,
  },
}
