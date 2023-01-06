import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { SingleRadioInput } from "./SingleRadioInput"

const meta: Meta<typeof SingleRadioInput> = {
  title: "Inputs / SingleRadioInput",
  component: SingleRadioInput,
}

export default meta
type Story = StoryObj<typeof SingleRadioInput>

const SingleRadioInputWithState = ({ label, options }: ComponentProps<typeof SingleRadioInput>) => {
  const [value, setValue] = useState<string | null>(null)

  return <SingleRadioInput value={value} onChange={setValue} {...{ label, options }} />
}

const Template: Story = {
  render: (props) => <SingleRadioInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Pneumothorax side",
    options: [
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
      { value: "both", label: "Both sides" },
    ],
  },
}
