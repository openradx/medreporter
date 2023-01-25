import { Box, Stack } from "@mantine/core"
import { ReactNode, useCallback, useRef } from "react"
import { useStructureTranslation } from "~/hooks/useStructureTranslation"
import { MeasurementsAction, MeasurementsData } from "~/types/measurements"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"

interface MeasurementsInputProps {
  label?: string
  extras?: ReactNode
  value: MeasurementsData
  onChange: (data: MeasurementsData) => void
  footer?: ReactNode
  disabled?: boolean
}

export const MeasurementsInput = ({
  label,
  extras,
  value,
  onChange,
  footer,
  disabled,
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
    clearAll: t("MeasurementsInput.toolClearAll"),
    clearReferences: t("MeasurementsInput.toolClearReferences"),
    dimensions: t("MeasurementsInput.formatDimensions"),
    followUp: t("MeasurementsInput.formatFollowUp"),
    location: t("MeasurementsInput.columnLocation"),
    reference: t("MeasurementsInput.columnReference"),
    rows: t("MeasurementsInput.formatRows"),
    shiftCurrent: t("MeasurementsInput.toolShiftCurrent"),
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
        disabled={disabled === true}
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
                disabled={disabled === true}
              />
            ))}
          </tbody>
          {footer && (
            <tfoot>
              <tr>
                <th />
                <th colSpan={8}>
                  <Box sx={{ display: "flex" }}>{footer}</Box>
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </Box>
    </Stack>
  )
}
