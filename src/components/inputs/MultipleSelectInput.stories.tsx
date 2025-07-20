import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { MultipleSelectInput } from "./MultipleSelectInput"

const meta: Meta<typeof MultipleSelectInput> = {
  title: "Inputs / MultipleSelectInput",
  component: MultipleSelectInput,
}

export default meta
type Story = StoryObj<typeof MultipleSelectInput>

const MultipleSelectInputWithState = ({
  label,
  extras,
  options,
  disabled,
}: ComponentProps<typeof MultipleSelectInput>) => {
  const [value, setValue] = useState<string[]>([])

  return (
    <InputLayout>
      <MultipleSelectInput
        value={value}
        onChange={setValue}
        {...{ label, extras, options, disabled }}
      />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <MultipleSelectInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Brain arteries",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
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
    disabled: false,
  },
}
