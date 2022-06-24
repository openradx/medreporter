import { DevTool } from "@hookform/devtools"
import { Box } from "@mantine/core"
import copy from "fast-copy"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import config from "../../app.config"
import { StructureFormContextProvider } from "../../contexts/StructureFormContext"
import { setDataInitialized } from "../../state/displaySlice"
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

  const changeStructureValueDebounced = useDebouncedCallback((moduleId, fieldId, value) => {
    dispatch(changeStructureValue({ moduleId, fieldId, value }))
  }, 500)

  useEffect(() => {
    let prevName = ""
    const subscription = watch((data, { name, type }) => {
      if (!name) return
      if (type === "change") {
        if (name !== prevName) {
          changeStructureValueDebounced.flush()
        }
        prevName = name
        const [moduleId, fieldId] = name.split(".")
        const value = data?.[moduleId]?.[fieldId]
        changeStructureValueDebounced(moduleId, fieldId, value)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, changeStructureValueDebounced])

  const initializeStructureReportDataDebounced = useDebouncedCallback(() => {
    const data = copy(getValues())
    dispatch(setStructureData(data, { undoable: false }))
    dispatch(setDataInitialized())
  }, 800)

  const defaultValuesRef = useRef<Record<string, Record<string, any>>>({})

  const registerDefaultValue = useCallback(
    (moduleId: string, fieldId: string, defaultValue: any) => {
      if (defaultValuesRef.current[moduleId] === undefined) {
        defaultValuesRef.current[moduleId] = { fieldId: defaultValue }
      } else {
        defaultValuesRef.current[moduleId][fieldId] = defaultValue
      }
      initializeStructureReportDataDebounced()
    },
    [initializeStructureReportDataDebounced]
  )

  const unregisterDefaultValue = useCallback((moduleId: string, fieldId: string) => {
    if (defaultValuesRef.current[moduleId] !== undefined) {
      delete defaultValuesRef.current[moduleId][fieldId]
      if (Object.keys(defaultValuesRef.current[moduleId]).length === 0) {
        delete defaultValuesRef.current[moduleId]
      }
    }
  }, [])

  const clearForm = useCallback(() => {
    const data = defaultValuesRef.current
    reset(copy(data))
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
