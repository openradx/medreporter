import { DevTool } from "@hookform/devtools"
import { Box } from "@mantine/core"
import { cloneDeep } from "lodash"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import config from "../../app.config"
import { StructureFormContextProvider } from "../../contexts/StructureFormContext"
import { useAppDispatch } from "../../state/store"
import {
  changeStructureValue,
  setStructureData,
  StructureDataState,
} from "../../state/structureDataSlice"

interface StructureFormProps {
  children: ReactNode
}

export const StructureForm = ({ children }: StructureFormProps) => {
  const methods = useForm<StructureDataState>()
  const dispatch = useAppDispatch()

  const { getValues, watch, reset } = methods

  const changeStructureValueDebounced = useDebouncedCallback((instanceId, fieldId, value) => {
    dispatch(changeStructureValue({ instanceId, fieldId, value }))
  }, 250)

  useEffect(() => {
    let prevName = ""
    watch((data, { name, type }) => {
      if (!name) return

      if (type === "change") {
        if (name !== prevName) {
          changeStructureValueDebounced.flush()
        }
        prevName = name
        const [instanceId, fieldId] = name.split(".")
        const value = data?.[instanceId]?.[fieldId]
        changeStructureValueDebounced(instanceId, fieldId, value)
      }
    })
  }, [watch, changeStructureValueDebounced])

  const initializeStructureReportDataDebounced = useDebouncedCallback(() => {
    const data = cloneDeep(getValues())
    dispatch(setStructureData(data, { undoable: false }))
  }, 500)

  const defaultValuesRef = useRef<Record<string, Record<string, any>>>({})

  const registerDefaultValue = useCallback(
    (instanceId: string, fieldId: string, defaultValue: any) => {
      if (defaultValuesRef.current[instanceId] === undefined) {
        defaultValuesRef.current[instanceId] = { fieldId: defaultValue }
      } else {
        defaultValuesRef.current[instanceId][fieldId] = defaultValue
      }
      initializeStructureReportDataDebounced()
    },
    [initializeStructureReportDataDebounced]
  )

  const unregisterDefaultValue = useCallback((instanceId: string, fieldId: string) => {
    if (defaultValuesRef.current[instanceId] !== undefined) {
      delete defaultValuesRef.current[instanceId][fieldId]
      if (Object.keys(defaultValuesRef.current[instanceId]).length === 0) {
        delete defaultValuesRef.current[instanceId]
      }
    }
  }, [])

  const clearForm = useCallback(() => {
    const data = defaultValuesRef.current
    reset(cloneDeep(data))
    dispatch(setStructureData(data))
  }, [reset, dispatch])

  return (
    <StructureFormContextProvider
      value={{ registerDefaultValue, unregisterDefaultValue, clearForm }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          sx={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
        >
          {children}
        </Box>
        {config.reactHookFormDevToolsEnabled && (
          <DevTool placement="top-right" control={methods?.control} />
        )}
      </FormProvider>
    </StructureFormContextProvider>
  )
}
