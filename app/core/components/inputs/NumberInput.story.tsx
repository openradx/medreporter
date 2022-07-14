import { ActionIcon } from "@mantine/core"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai"
import { InputLayout } from "../storybook/InputLayout"
import { NumberInput } from "./NumberInput"

export default {
  title: "Inputs / NumberInput",
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = ({
  label,
  min,
  max,
  precision,
  step,
  extras,
}) => {
  const [value, setValue] = useState<number | null>(0)

  return (
    <InputLayout>
      <NumberInput
        value={value}
        onChange={setValue}
        {...{ label, min, max, precision, step, extras }}
      />
    </InputLayout>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Pneumothorax size",
}

export const WithExtras = Template.bind({})
WithExtras.args = {
  label: "Pneumothorax size",
  extras: (
    <ActionIcon>
      <InfoIcon />
    </ActionIcon>
  ),
}
