import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { SingleLineInput } from "./SingleLineInput"

const meta: Meta<typeof SingleLineInput> = {
  title: "Inputs / SingleLineInput",
  component: SingleLineInput,
}

export default meta
type Story = StoryObj<typeof SingleLineInput>

const SingleLineInputWithState = ({ label }: ComponentProps<typeof SingleLineInput>) => {
  const [value, setValue] = useState<string>("")

  return (
    <InputLayout>
      <SingleLineInput value={value} onChange={setValue} {...{ label }} />
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
  },
}
