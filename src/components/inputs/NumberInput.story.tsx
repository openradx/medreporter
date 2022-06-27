import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { FieldInfo } from "../structuredReport/FieldInfo"
import { NumberInput } from "./NumberInput"

export default {
  title: "Number field",
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
    <NumberInput
      value={value}
      onChange={setValue}
      {...{ label, min, max, precision, step, extras }}
    />
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Number field",
}

export const WithOverlay = Template.bind({})
WithOverlay.args = {
  label: "With Overlay",
  extras: <FieldInfo title="Foo" content="bar" />,
}
