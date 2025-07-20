import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { MultipleCheckboxInput } from "./MultipleCheckboxInput"

const meta: Meta<typeof MultipleCheckboxInput> = {
  title: "Inputs / MultipleCheckboxInput",
  component: MultipleCheckboxInput,
}

export default meta
type Story = StoryObj<typeof MultipleCheckboxInput>

const MultipleCheckboxInputWithState = ({
  label,
  extras,
  options,
  disabled,
}: ComponentProps<typeof MultipleCheckboxInput>) => {
  const [value, setValue] = useState<string[]>([])

  return (
    <MultipleCheckboxInput
      value={value}
      onChange={setValue}
      {...{ label, extras, options, disabled }}
    />
  )
}

const Template: Story = {
  render: (props) => <MultipleCheckboxInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Brain lobe",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    options: [
      { value: "frontal", label: "Frontal lobe" },
      { value: "temporal", label: "Temporal lobe" },
      { value: "parietal", label: "Parietal lobe" },
      { value: "occipital", label: "Occipital lobe" },
    ],
    disabled: false,
  },
}
