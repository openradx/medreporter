import { useCallback } from "react"
import { useModule } from "~/contexts/ModuleContext"
import { Transformer } from "~/contexts/TransformerRegistryContext"
import { useStructureController } from "~/hooks/useStructureController"
import { useTransformer } from "~/hooks/useTransformer"
import { selectReportFormat } from "~/state/displaySlice"
import { useAppSelector } from "~/state/store"
import {
  calcStats,
  checkAllDataEmpty,
  createEmptyMeasurements,
  createStatsText,
} from "~/utils/measurementsUtils"
import { MeasurementsData } from "../../types/measurements"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"
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
  const { id: moduleId } = useModule()
  const { value, onChange } = useStructureController({
    moduleId,
    fieldId,
    defaultValue,
  })

  const reportFormat = useAppSelector(selectReportFormat)

  const transformer = useCallback<Transformer>(
    (reportData) => {
      const data = reportData[moduleId]?.[fieldId] as MeasurementsData
      if (data) {
        if (checkAllDataEmpty(data)) {
          reportData[moduleId][fieldId] = null
        } else {
          const stats = createStatsText(calcStats(data))
          reportData[moduleId][fieldId] = (
            <MeasurementsOutput format={reportFormat} {...{ data, label, stats }} />
          )
        }
      }
    },
    [fieldId, label, moduleId, reportFormat]
  )

  useTransformer(transformer)

  return (
    <BaseField {...{ moduleId, fieldId, label, defaultValue, value, onChange, hidden }}>
      <MeasurementsInput
        {...{ label, extras, value, onChange, disabled }}
        footer={null} // TODO:
      />
    </BaseField>
  )
}
