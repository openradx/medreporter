import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { SingleSelectInput } from "./SingleSelectInput"

const meta: Meta<typeof SingleSelectInput> = {
  title: "Inputs / SingleSelectInput",
  component: SingleSelectInput,
}

export default meta
type Story = StoryObj<typeof SingleSelectInput>

const SingleSelectInputWithState = ({
  label,
  options,
}: ComponentProps<typeof SingleSelectInput>) => {
  const [value, setValue] = useState<string | null>("")

  return (
    <InputLayout>
      <SingleSelectInput value={value} onChange={setValue} {...{ label, options }} />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <SingleSelectInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Brain arteries",
    options: [
      { value: "aci", label: "A. carotis interna" },
      { value: "aca", label: "A. cerebri anterior" },
      { value: "mca", label: "A. cerebri media" },
      { value: "pca", label: "A. cerebri posterior" },
      { value: "suca", label: "A. cerebelli superior" },
      { value: "aica", label: "A. cerebelli inferior anterior" },
      { value: "pica", label: "A. cerebelli inferior posterior" },
      { value: "ba", label: "A. basilaris" },
      { value: "va", label: "A. vertebralis" },
    ],
  },
}
