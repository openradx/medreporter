import { useGroup } from "~/contexts/GroupContext"
import { useStructureController } from "~/hooks/useStructureController"
import { createEmptyMeasurements } from "~/utils/measurementsUtils"
import { MeasurementsData } from "../../types/measurements"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

const DEFAULT_MEASUREMENTS_DATA = createEmptyMeasurements(false, 3, 2)

interface MeasurementsFieldProps extends CommonFieldProps<MeasurementsData> {}

export const MeasurementsField = ({
  id: fieldId,
  label,
  extras,
  defaultValue = DEFAULT_MEASUREMENTS_DATA,
  disabled,
  hidden,
}: MeasurementsFieldProps) => {
  const { value, onChange } = useStructureController({
    fieldId,
    defaultValue,
  })

  const groupDisabled = useGroup()?.disabled
  disabled = disabled || groupDisabled

  return (
    <BaseField {...{ fieldId, label, defaultValue, value, onChange, hidden, width: "full" }}>
      <MeasurementsInput
        {...{ label, extras, value, onChange, disabled }}
        footer={null} // TODO:
      />
    </BaseField>
  )
}
