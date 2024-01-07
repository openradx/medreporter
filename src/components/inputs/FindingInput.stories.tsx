/* eslint-disable i18next/no-literal-string */
import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { FindingInput } from "./FindingInput"

const meta: Meta<typeof FindingInput> = {
  title: "Inputs / FindingInput",
  component: FindingInput,
}

export default meta
type Story = StoryObj<typeof FindingInput>

const FindingInputWithState = ({ label }: ComponentProps<typeof FindingInput>) => {
  const [value, setValue] = useState(false)

  return (
    <FindingInput value={value} onChange={setValue} {...{ label }}>
      <div>Content</div>
    </FindingInput>
  )
}

const Template: Story = {
  render: (props) => <FindingInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pleural effusion",
  },
}
