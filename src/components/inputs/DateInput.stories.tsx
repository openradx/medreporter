import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import "dayjs/locale/de"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { InputLayout } from "../storybook/InputLayout"
import { DateInput } from "./DateInput"

const meta: Meta<typeof DateInput> = {
  title: "Inputs / DateInput",
  component: DateInput,
}

export default meta
type Story = StoryObj<typeof DateInput>

const DateInputWithState = ({
  label,
  extras,
  locale,
  format,
  disabled,
}: ComponentProps<typeof DateInput>) => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <InputLayout>
      <DateInput
        value={value}
        onChange={setValue}
        {...{ label, extras, locale, format, disabled }}
      />
    </InputLayout>
  )
}

const Template: Story = {
  render: (props) => <DateInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Study date",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    locale: "de",
    format: "DD.MM.YYYY",
    disabled: false,
  },
}
