import { Box, Stack } from "@mantine/core"
import { ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { MeasurementsContextProvider } from "../../../contexts/MeasurementsContext"
import {
  calcStats,
  createStatsText,
  getMeasurementsDataParams,
  measurementsReducer,
} from "../../../utils/measurementUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"
import { MeasurementsAction, MeasurementsData, MeasurementsStats } from "./measurementTypes"

const STATS_DEBOUNCE = 500

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
  onStats?: (stats: MeasurementsStats) => void
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
  onStats,
  extras,
}: MeasurementsInputProps) => {
  const data = value
  const params = getMeasurementsDataParams(data)

  const dataRef = useRef(data)
  dataRef.current = data

  const [stats, setStats] = useState<MeasurementsStats>({
    previousSum: null,
    currentSum: null,
    percentageChange: null,
  })

  const updateStats = useDebouncedCallback(() => {
    const newStats = calcStats(dataRef.current)
    setStats(newStats)
    typeof onStats === "function" && onStats(newStats)
  }, STATS_DEBOUNCE)

  useEffect(() => {
    updateStats()
  }, [data])

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
      <Box>{createStatsText(stats)}</Box>
    </Stack>
  )
}
