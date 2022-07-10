import { ReactNode, useCallback } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { Transformer } from "../../contexts/TransformerRegistryContext"
import { useStructureController } from "../../hooks/useStructureController"
import { useTransformer } from "../../hooks/useTransformer"
import { selectReportFormat } from "../../state/displaySlice"
import { useAppSelector } from "../../state/store"
import { calcStats, createEmptyMeasurements, createStatsText } from "../../utils/measurementUtils"
import { MeasurementsInput } from "../inputs/MeasurementsInput"
import { MeasurementsData } from "../inputs/MeasurementsInput/measurementTypes"
import { MeasurementsHtmlOutput } from "../outputs/MeasurementsHtmlOutput"
import { MeasurementsTextOutput } from "../outputs/MeasurmentsTextOutput"
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
        const stats = createStatsText(calcStats(data))
        if (reportFormat === "text") {
          reportData[moduleId][fieldId] = <MeasurementsTextOutput data={data} stats={stats} />
        } else {
          reportData[moduleId][fieldId] = <MeasurementsHtmlOutput data={data} stats={stats} />
        }
      }
    },
    [fieldId, moduleId, reportFormat]
  )

  useTransformer(transformer)

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <MeasurementsInput {...{ label, value, onChange, extras }} />
    </BaseField>
  )
}
