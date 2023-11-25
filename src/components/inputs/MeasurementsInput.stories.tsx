import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps, useState } from "react"
import { calcStats, createEmptyMeasurements, createStatsText } from "~/utils/measurementsUtils"
import { MeasurementsData } from "../../types/measurements"
import { SiteTranslations } from "../storybook/SiteTranslations"
import { MeasurementsInput } from "./MeasurementsInput"

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
    <SiteTranslations additionalNamespaces={["template"]}>
      <MeasurementsInput
        value={value}
        onChange={setValue}
        footer={footer}
        {...{ label, extras, disabled }}
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
  },
}
