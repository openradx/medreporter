import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { createEmptyMeasurements } from "../../utils/measurementUtils"
import { MeasurementsInput } from "./MeasurementsInput"
import { MeasurementsData } from "./MeasurementsInput/measurementTypes"

export default {
  title: "Measurements input",
  component: MeasurementsInput,
} as ComponentMeta<typeof MeasurementsInput>

const Template: ComponentStory<typeof MeasurementsInput> = ({ label, extras }) => {
  const [value, setValue] = useState<MeasurementsData>(createEmptyMeasurements(false, 3, 2))

  return <MeasurementsInput value={value} onChange={setValue} {...{ label, extras }} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Measurements input",
}
