import { ReactNode, useCallback } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { Transformer } from "../../contexts/TransformerRegistryContext"
import { useStructureController } from "../../hooks/useStructureController"
import { useTransformer } from "../../hooks/useTransformer"
import { calcStats, createEmptyMeasurements } from "../../utils/measurementUtils"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { MeasurementsData } from "../inputs/MeasurementsInput/measurementTypes"
import { BaseField } from "./BaseField"
import { CommonFieldProps, MeasurementsTransformed } from "./fieldTypes"

const DEFAULT_MEASUREMENTS_DATA = createEmptyMeasurements(false, 3, 2)

interface MeasurementsFieldProps extends CommonFieldProps {
  defaultValue?: MeasurementsData
  extras?: ReactNode
}

export const MeasurementsField = ({
  id: fieldId,
  label = "",
  visible = true,
  defaultValue = DEFAULT_MEASUREMENTS_DATA,
  extras,
}: MeasurementsFieldProps) => {
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  const transformer = useCallback<Transformer>(
    (reportData) => {
      const data = reportData[moduleId]?.[fieldId] as MeasurementsData
      if (data) {
        const stats = calcStats(data)
        const transformed: MeasurementsTransformed = { data, stats }
        reportData[moduleId][fieldId] = transformed
      }
    },
    [fieldId, moduleId]
  )

  useTransformer(transformer)

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <MeasurementsInput {...{ label, value, onChange, extras }} />
    </BaseField>
  )
}
