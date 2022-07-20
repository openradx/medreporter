import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { calcStats, createEmptyMeasurements, createStatsText } from "../../utils/measurementsUtils"
import { StructuredReportTranslations } from "../storybook/StructuredReportTranslations"
import { MeasurementsInput } from "./MeasurementsInput"
import { MeasurementsData } from "./MeasurementsInput/measurementsTypes"

export default {
  title: "Inputs / MeasurementsInput",
  component: MeasurementsInput,
} as ComponentMeta<typeof MeasurementsInput>

const Template: ComponentStory<typeof MeasurementsInput> = ({ label, extras, disabled }) => {
  const [value, setValue] = useState<MeasurementsData>(createEmptyMeasurements(false, 3, 2))
  const stats = calcStats(value)
  const footer = createStatsText(stats)

  return (
    <StructuredReportTranslations>
      <MeasurementsInput
        value={value}
        onChange={setValue}
        footer={footer}
        {...{ label, extras, disabled }}
      />
    </StructuredReportTranslations>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Primary targets",
}