import { Box, Stack } from "@mantine/core"
import { ReactNode, useCallback, useRef } from "react"
import { MeasurementsContextProvider } from "../../../contexts/MeasurementsContext"
import { getMeasurementsDataParams, measurementsReducer } from "../../../utils/measurementUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"
import { MeasurementsAction, MeasurementsData } from "./measurementTypes"

interface MeasurementsInputProps {
  label?: string
  labels?: {
    location: string
    reference: string
    followUp: string
    rows: string
    dimensions: string
  }
  value: MeasurementsData
  onChange: (data: MeasurementsData) => void
  footer?: ReactNode
  extras?: ReactNode
}

export const MeasurementsInput = ({
  label,
  labels = {
    location: "Location",
    reference: "Reference",
    followUp: "Follow up",
    rows: "Rows",
    dimensions: "Dimensions",
  },
  value,
  onChange,
  footer,
  extras,
}: MeasurementsInputProps) => {
  const data = value
  const params = getMeasurementsDataParams(data)

  const dataRef = useRef(data)
  dataRef.current = data

  const dispatch = useCallback((action: MeasurementsAction) => {
    onChange(measurementsReducer(dataRef.current, action))
  }, [])

  return (
    <Stack spacing="xs">
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        <MeasurementsContextProvider value={{ dispatch }}>
          {(label || extras) && <InputLabel label={label} extras={extras} />}
        </MeasurementsContextProvider>
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
