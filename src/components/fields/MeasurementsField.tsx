import { ReactNode, useCallback } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { Transformer } from "../../contexts/TransformerRegistryContext"
import { useStructureController } from "../../hooks/useStructureController"
import { useTransformer } from "../../hooks/useTransformer"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import {
  calcStats,
  checkAllDataEmpty,
  createEmptyMeasurements,
  createStatsText,
} from "../../utils/measurementsUtils"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { MeasurementsData } from "../inputs/MeasurementsInput/measurementsTypes"
import { MeasurementsOutput } from "../outputs/MeasurementsOutput"
import { BaseField } from "./BaseField"
import { CommonFieldProps } from "./fieldTypes"

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
            <MeasurementsOutput format={reportFormat} data={data} stats={stats} label={label} />
          )
        }
      }
    },
    [fieldId, label, moduleId, reportFormat]
  )

  useTransformer(transformer)

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <MeasurementsInput {...{ label, value, onChange, extras }} />
    </BaseField>
  )
}
