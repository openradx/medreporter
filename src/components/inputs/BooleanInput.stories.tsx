import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { BinaryInput } from "./BinaryInput"

const meta: Meta<typeof BinaryInput> = {
  title: "Inputs / BinaryInput",
  component: BinaryInput,
}

export default meta
type Story = StoryObj<typeof BinaryInput>

const BinaryInputWithState = ({ label }: ComponentProps<typeof BinaryInput>) => {
  const [value, setValue] = useState(false)

  return <BinaryInput value={value} onChange={setValue} {...{ label }} />
}

const Template: Story = {
  render: (props) => <BinaryInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pneumothorax",
  },
}
