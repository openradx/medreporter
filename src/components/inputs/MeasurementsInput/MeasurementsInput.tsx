import { useLingui } from "@lingui/react/macro"
import { Box, Flex, Group, ScrollArea, Stack } from "@mantine/core"
import { ReactNode, useCallback, useRef } from "react"
import { MeasurementsData } from "~/schemas/structure"
import { MeasurementsAction } from "~/types/measurements"
import { getMeasurementsDataParams, measurementsReducer } from "~/utils/measurementsUtils"
import { InputLabel } from "../InputLabel"
import { ControlPanel } from "./ControlPanel"
import { DataRow } from "./DataRow"
import { HeaderRow } from "./HeaderRow"
import classes from "./MeasurementsInput.module.css"

interface MeasurementsInputProps {
  label?: string
  extras?: ReactNode
  value: MeasurementsData
  onChange: (data: MeasurementsData) => void
  footer?: ReactNode
  disabled?: boolean
  border?: boolean
}

export const MeasurementsInput = ({
  label,
  extras,
  value,
  onChange,
  footer,
  disabled,
  border = true,
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

  const { t } = useLingui()
  // TODO: make label configurable props
  const labels = {
    clearAll: t`Clear all`,
    clearReferences: t`Clear references`,
    dimensions: t`Format dimensions`,
    followUp: t`Follow up`,
    location: t`Location`,
    reference: t`Reference`,
    rows: t`Rows`,
    shiftCurrent: t`Shift current`,
  }

  return (
    <Flex
      component="fieldset"
      className={border ? classes.measurementsBorder : classes.measurementsNoBorder}
      w="100%"
      miw={0}
    >
      <Box component="legend">
        {(label || extras) && <InputLabel label={label} extras={extras} />}
      </Box>
      <Stack w="100%" gap="xs">
        <ControlPanel
          labels={labels}
          followUp={params.followUp}
          rows={params.rows}
          dimensions={params.dimensions}
          dispatch={dispatch}
          disabled={disabled === true}
        />
        <ScrollArea w="100%" scrollbars="x" offsetScrollbars scrollHideDelay={0}>
          <Box>
            <table>
              <tbody>
                <HeaderRow
                  labels={labels}
                  followUp={params.followUp}
                  dimensions={params.dimensions}
                />
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
                      <Group>{footer}</Group>
                    </th>
                  </tr>
                </tfoot>
              )}
            </table>
          </Box>
        </ScrollArea>
      </Stack>
    </Flex>
  )
}
