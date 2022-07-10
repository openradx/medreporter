import { ReactNode, useCallback, useMemo } from "react"
import { useModule } from "../../contexts/ModuleContext"
import { Transformer } from "../../contexts/TransformerRegistryContext"
import { useReportTranslation } from "../../hooks/useReportTranslation"
import { useStructureController } from "../../hooks/useStructureController"
import { useStructureTranslation } from "../../hooks/useStructureTranslation"
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

  const { t: st } = useStructureTranslation()
  const structureLabels = useMemo(
    () => ({
      location: st("MeasurementsField.location"),
      reference: st("MeasurementsField.reference"),
      followUp: st("MeasurementsField.followUp"),
      rows: st("MeasurementsField.rows"),
      dimensions: st("MeasurementsField.dimensions"),
      clearAll: st("MeasurementsField.clearAll"),
      shiftCurrent: st("MeasurementsField.shiftCurrent"),
    }),
    [st]
  )

  const { t: rt } = useReportTranslation()
  const reportLabels = useMemo(
    () => ({
      previous: rt("MeasurementsField.previous"),
      current: rt("MeasurementsField.current"),
      location: rt("MeasurementsField.location"),
      reference: rt("MeasurementsField.reference"),
    }),
    [rt]
  )

  const transformer = useCallback<Transformer>(
    (reportData) => {
      const data = reportData[moduleId]?.[fieldId] as MeasurementsData
      if (data) {
        const stats = createStatsText(calcStats(data))
        if (reportFormat === "text") {
          reportData[moduleId][fieldId] = (
            <MeasurementsTextOutput data={data} stats={stats} label={label} labels={reportLabels} />
          )
        } else {
          reportData[moduleId][fieldId] = (
            <MeasurementsHtmlOutput data={data} stats={stats} label={label} labels={reportLabels} />
          )
        }
      }
    },
    [fieldId, label, moduleId, reportFormat, reportLabels]
  )

  useTransformer(transformer)

  return (
    <BaseField {...{ moduleId, fieldId, visible, defaultValue, value, onChange }}>
      <MeasurementsInput labels={structureLabels} {...{ label, value, onChange, extras }} />
    </BaseField>
  )
}
