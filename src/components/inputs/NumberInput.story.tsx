import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { FieldInfo } from "../structuredReport/FieldInfo"
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

export const WithInfo = Template.bind({})
WithInfo.args = {
  label: "Pneumothorax size",
  extras: <FieldInfo title="Pneumothorax">Just some info about a pneumothorax.</FieldInfo>,
}
