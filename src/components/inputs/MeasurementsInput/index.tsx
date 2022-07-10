import { Box, Stack } from "@mantine/core"
import { ReactNode, useCallback, useRef } from "react"
import { useStructureTranslation } from "../../../hooks/useStructureTranslation"
import { getMeasurementsDataParams, measurementsReducer } from "../../../utils/measurementUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"
import { MeasurementsAction, MeasurementsData } from "./measurementTypes"

interface MeasurementsInputProps {
  label?: string
  value: MeasurementsData
  onChange: (data: MeasurementsData) => void
  footer?: ReactNode
  extras?: ReactNode
}

export const MeasurementsInput = ({
  label,
  value,
  onChange,
  footer,
  extras,
}: MeasurementsInputProps) => {
  const data = value
  const params = getMeasurementsDataParams(data)

  const dataRef = useRef(data)
  dataRef.current = data

  const dispatch = useCallback(
    (action: MeasurementsAction) => {
      onChange(measurementsReducer(dataRef.current, action))
    },
    [onChange]
  )

  const { t } = useStructureTranslation()
  const labels = {
    location: t("MeasurementsInput.location"),
    reference: t("MeasurementsInput.reference"),
    followUp: t("MeasurementsInput.followUp"),
    rows: t("MeasurementsInput.rows"),
    dimensions: t("MeasurementsInput.dimensions"),
    clearAll: t("MeasurementsInput.clearAll"),
    shiftCurrent: t("MeasurementsInput.shiftCurrent"),
  }

  return (
    <Stack spacing="xs">
      <Box sx={{ marginLeft: 35 }}>
        {(label || extras) && <InputLabel label={label} extras={extras} />}
      </Box>
      <ControlPanel
        labels={labels}
        followUp={params.followUp}
        rows={params.rows}
        dimensions={params.dimensions}
        dispatch={dispatch}
      />
      <Box sx={{ overflow: "auto" }}>
        <table>
          <tbody>
            <HeaderRow labels={labels} followUp={params.followUp} dimensions={params.dimensions} />
            {data.map((rowData, rowNumber) => (
              <DataRow
                key={rowNumber}
                rowData={rowData}
                rowNumber={rowNumber}
                followUp={params.followUp}
                dimensions={params.dimensions}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
      </Box>
      {footer}
    </Stack>
  )
}
