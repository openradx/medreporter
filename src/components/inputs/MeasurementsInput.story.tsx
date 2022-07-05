import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { calcStats, createEmptyMeasurements, createStatsText } from "../../utils/measurementUtils"
import { MeasurementsInput } from "./MeasurementsInput"
import { MeasurementsData } from "./MeasurementsInput/measurementTypes"

export default {
  title: "Measurements input",
  component: MeasurementsInput,
} as ComponentMeta<typeof MeasurementsInput>

const Template: ComponentStory<typeof MeasurementsInput> = ({ label, extras }) => {
  const [value, setValue] = useState<MeasurementsData>(createEmptyMeasurements(false, 3, 2))
  const stats = calcStats(value)
  const footer = createStatsText(stats)

  return (
    <MeasurementsInput value={value} onChange={setValue} footer={footer} {...{ label, extras }} />
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Measurements input",
}
