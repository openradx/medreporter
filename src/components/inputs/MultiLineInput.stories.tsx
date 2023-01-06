import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { MultiLineInput } from "./MultiLineInput"

const meta: Meta<typeof MultiLineInput> = {
  title: "Inputs  / MultiLineInput",
  component: MultiLineInput,
}

export default meta
type Story = StoryObj<typeof MultiLineInput>

const MultiLineInputWithState = ({ label }: ComponentProps<typeof MultiLineInput>) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <MultiLineInput value={value} onChange={setValue} {...{ label }} />
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
  },
}
