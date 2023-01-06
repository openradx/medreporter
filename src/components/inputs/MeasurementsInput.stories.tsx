import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { calcStats, createEmptyMeasurements, createStatsText } from "~/utils/measurementsUtils"
import { SiteTranslations } from "../storybook/SiteTranslations"
import { StructuredReportTranslations } from "../storybook/StructuredReportTranslations"
import { MeasurementsInput } from "./MeasurementsInput"
import { MeasurementsData } from "./MeasurementsInput/measurementsTypes"

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
}: ComponentProps<typeof MeasurementsInput>) => {
  const [value, setValue] = useState<MeasurementsData>(createEmptyMeasurements(false, 3, 2))
  const stats = calcStats(value)
  const footer = createStatsText(stats)

  return (
    <SiteTranslations>
      <StructuredReportTranslations>
        <MeasurementsInput
          value={value}
          onChange={setValue}
          footer={footer}
          {...{ label, extras, disabled }}
        />
      </StructuredReportTranslations>
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
  },
}
