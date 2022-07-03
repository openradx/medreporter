import { Box } from "@mantine/core"
import { ReactElement, useCallback, useRef } from "react"
import { MeasurementsContextProvider } from "../../../contexts/MeasurementsContext"
import { getMeasurementsDataParams, measurementsReducer } from "../../../utils/measurementUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"
import { MeasurementsAction, MeasurementsData, MeasurementsStats } from "./measurementTypes"

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
  onChange: (data: MeasurementsData, stats: MeasurementsStats) => void
  extras?: ReactElement
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
  extras,
}: MeasurementsInputProps) => {
  const data = value
  const params = getMeasurementsDataParams(data)

  const dataRef = useRef(data)
  dataRef.current = data

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const dispatch = useCallback((action: MeasurementsAction) => {
    onChangeRef.current(measurementsReducer(dataRef.current, action), {
      // TODO:
      currentSum: 0,
      percentageChange: 0,
      previousSum: 0,
    })
  }, [])

  return (
    <Box sx={{ minWidth: 0, maxWidth: "fit-content" }}>
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
      <Box sx={{ overflow: "auto" }}>
        <ControlPanel
          labels={labels}
          followUp={params.followUp}
          rows={params.rows}
          dimensions={params.dimensions}
          dispatch={dispatch}
        />
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
    </Box>
  )
}
