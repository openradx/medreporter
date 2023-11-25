import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { InputLayout } from "../storybook/InputLayout"
import { NumberInput } from "./NumberInput"

const meta: Meta<typeof NumberInput> = {
  title: "Inputs / NumberInput",
  component: NumberInput,
}

export default meta
type Story = StoryObj<typeof NumberInput>

const NumberInputWithState = ({
  label,
  min,
  max,
  precision,
  start,
  step,
  extras,
}: ComponentProps<typeof NumberInput>) => {
  const [value, setValue] = useState<number | null>(0)

  return (
    <InputLayout>
      <NumberInput
        value={value}
        onChange={setValue}
        {...{ label, min, max, precision, start, step, extras }}
      />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <NumberInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pneumothorax size",
  },
}

export const WithExtras: Story = {
  ...Template,
  args: {
    label: "Pneumothorax size",
    extras: (
      <ActionIcon>
        <InfoIcon />
      </ActionIcon>
    ),
  },
}
