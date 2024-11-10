import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { SingleLineInput } from "./SingleLineInput"

const meta: Meta<typeof SingleLineInput> = {
  title: "Inputs / SingleLineInput",
  component: SingleLineInput,
}

export default meta
type Story = StoryObj<typeof SingleLineInput>

const SingleLineInputWithState = ({
  label,
  extras,
  disabled,
}: ComponentProps<typeof SingleLineInput>) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <SingleLineInput value={value} onChange={setValue} {...{ label, extras, disabled }} />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <SingleLineInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Additional findings",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    disabled: false,
  },
}
