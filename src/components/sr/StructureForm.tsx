import { Box } from "@mantine/core"
import copy from "fast-copy"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { StructureFormContextProvider } from "~/contexts/StructureFormContext"
import { setDataInitialized } from "~/state/displaySlice"
import {
  selectCanRedo,
  selectCanUndo,
  undo as doUndo,
  redo as doRedo,
} from "~/state/historyTrackerSlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import {
  changeStructureValue,
  setStructureData,
  StructureDataState,
} from "~/state/structureDataSlice"

interface StructureFormProps {
  children: ReactNode
}

export const StructureForm = ({ children }: StructureFormProps) => {
  const methods = useForm<StructureDataState>()
  const dispatch = useAppDispatch()

  const { getValues, watch, reset } = methods

  const [modified, setModified] = useState(false)

  const changeStructureValueDebounced = useDebouncedCallback((moduleId, fieldId, value) => {
    dispatch(changeStructureValue({ moduleId, fieldId, value: copy(value) }))
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
      setModified(true)
    })
    return () => subscription.unsubscribe()
  }, [watch, changeStructureValueDebounced])

  const initializeStructureReportDataDebounced = useDebouncedCallback(() => {
    dispatch(setStructureData(copy(getValues()), { undoable: false }))
    dispatch(setDataInitialized())
  }, 800)

  const defaultValuesRef = useRef<Record<string, Record<string, any>>>({})

  const registerDefaultValue = useCallback(
    (moduleId: string, fieldId: string, defaultValue: any) => {
      if (defaultValuesRef.current[moduleId] === undefined) {
        defaultValuesRef.current[moduleId] = { [fieldId]: copy(defaultValue) }
      } else {
        defaultValuesRef.current[moduleId][fieldId] = copy(defaultValue)
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
    changeStructureValueDebounced.flush()
    const data = defaultValuesRef.current
    reset(copy(data))
    dispatch(setStructureData(copy(data)))
    setModified(false)
  }, [changeStructureValueDebounced, dispatch, reset])

  const canUndo = useAppSelector(selectCanUndo)
  const canRedo = useAppSelector(selectCanRedo)

  const undo = useCallback(() => {
    changeStructureValueDebounced.flush()
    const state = dispatch(doUndo())
    reset(copy(state.structureData.present))
    setModified(true)
  }, [changeStructureValueDebounced, dispatch, reset])

  const redo = useCallback(() => {
    changeStructureValueDebounced.flush()
    const state = dispatch(doRedo())
    reset(copy(state.structureData.present))
    setModified(true)
  }, [changeStructureValueDebounced, dispatch, reset])

  return (
    <StructureFormContextProvider
      value={{
        modified,
        canUndo,
        canRedo,
        undo,
        redo,
        registerDefaultValue,
        unregisterDefaultValue,
        clearForm,
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          sx={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
        >
          {children}
        </Box>
        {/* TODO: see https://github.com/react-hook-form/devtools/issues/141 */}
        {/* {config.reactHookFormDevToolsEnabled && (
          <DevTool placement="top-right" control={methods?.control} />
        )} */}
      </FormProvider>
    </StructureFormContextProvider>
  )
}
