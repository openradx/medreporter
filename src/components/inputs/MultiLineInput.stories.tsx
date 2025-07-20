import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { MultiLineInput } from "./MultiLineInput"

const meta: Meta<typeof MultiLineInput> = {
  title: "Inputs  / MultiLineInput",
  component: MultiLineInput,
}

export default meta
type Story = StoryObj<typeof MultiLineInput>

const MultiLineInputWithState = ({
  label,
  extras,
  disabled,
  grow,
  rows,
  minRows,
  maxRows,
}: ComponentProps<typeof MultiLineInput>) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <MultiLineInput
        value={value}
        onChange={setValue}
        {...{ label, extras, disabled, grow, rows, minRows, maxRows }}
      />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <MultiLineInputWithState {...props} />,
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
    grow: true,
    rows: 3,
    minRows: 2,
    maxRows: 7,
  },
}
