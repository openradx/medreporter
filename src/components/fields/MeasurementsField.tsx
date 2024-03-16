import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { MeasurementsData } from "~/schemas/structure"
import { createEmptyMeasurements } from "~/utils/measurementsUtils"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

const DEFAULT_MEASUREMENTS_DATA = createEmptyMeasurements(false, 3, 2)

interface MeasurementsFieldProps extends CommonFieldProps<MeasurementsData> {
  rows?: number
  dimensions?: 1 | 2 | 3
  followUp?: boolean
  border?: boolean
}

export const MeasurementsField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = DEFAULT_MEASUREMENTS_DATA,
  disabled,
  hidden,
  rows,
  dimensions,
  followUp,
  border,
}: MeasurementsFieldProps) => {
  let processedDefaultValue = defaultValue
  if (dimensions || rows || followUp) {
    processedDefaultValue = createEmptyMeasurements(followUp || false, rows || 3, dimensions || 2)
  }

  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue: processedDefaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width: "full" }}>
      <MeasurementsInput
        {...{ label, extras, value, onChange, disabled, border }}
        footer={null} // TODO:
      />
    </BaseField>
  )
}
