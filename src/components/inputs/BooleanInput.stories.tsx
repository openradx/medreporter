import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { BooleanInput } from "./BooleanInput"

const meta: Meta<typeof BooleanInput> = {
  title: "Inputs / BooleanInput",
  component: BooleanInput,
}

export default meta
type Story = StoryObj<typeof BooleanInput>

const BooleanInputWithState = ({ label }: ComponentProps<typeof BooleanInput>) => {
  const [value, setValue] = useState(false)

  return <BooleanInput value={value} onChange={setValue} {...{ label }} />
}

const Template: Story = {
  render: (props) => <BooleanInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pneumothorax",
  },
}
