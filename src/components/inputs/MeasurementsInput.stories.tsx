import { ActionIcon } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/nextjs"
import { InfoIcon } from "lucide-react"
import { ComponentProps, useState } from "react"
import { MeasurementsData } from "~/schemas/structure"
import { calcStats, createEmptyMeasurements, createStatsText } from "~/utils/measurementsUtils"
import { SiteTranslations } from "../storybook/SiteTranslations"
import { MeasurementsInput } from "./MeasurementsInput/MeasurementsInput"

const meta: Meta<typeof MeasurementsInput> = {
  title: "Inputs / MeasurementsInput",
  component: MeasurementsInput,
}

export default meta
type Story = StoryObj<typeof MeasurementsInput>

const MeasurementsInputWithState = ({
  label,
  extras,
  disabled,
  border,
}: ComponentProps<typeof MeasurementsInput>) => {
  const [value, setValue] = useState<MeasurementsData>(createEmptyMeasurements(false, 3, 2))
  const stats = calcStats(value)
  const footer = createStatsText(stats)

  return (
    <SiteTranslations>
      <MeasurementsInput
        value={value}
        onChange={setValue}
        footer={footer}
        {...{ label, extras, disabled, border }}
      />
    </SiteTranslations>
  )
}

const Template: Story = {
  render: (props) => <MeasurementsInputWithState {...props} />,
}

export const Basic: Story = {
  ...Template,
  args: {
    label: "Primary targets",
    extras: (
      <ActionIcon variant="transparent" size={20}>
        <InfoIcon size={16} />
      </ActionIcon>
    ),
    disabled: false,
    border: true,
  },
}
