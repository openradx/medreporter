import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { Info as InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
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
  extras,
  disabled,
  min,
  max,
  start,
  step,
  precision,
  width,
}: ComponentProps<typeof NumberInput>) => {
  const [value, setValue] = useState<number | null>(0)

  return (
    <InputLayout width={width}>
      <NumberInput
        value={value}
        onChange={setValue}
        {...{
          label,
          extras,
          disabled,
          min,
          max,
          start,
          step,
          precision,
        }}
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
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    disabled: false,
    min: 0,
    max: 100,
    start: 0,
    step: 1,
    precision: 0,
    width: 250,
  },
}
