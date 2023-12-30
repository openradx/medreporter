import { Flex } from "@mantine/core"
import copy from "fast-copy"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { StructureFormContextProvider } from "~/contexts/StructureFormContext"
import { setDataInitialized } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import {
  changeStructureValue,
  redoAndSelect,
  selectCanRedo,
  selectCanUndo,
  setStructureData,
  StructureDataState,
  undoAndSelect,
} from "~/state/structureDataSlice"

interface StructureFormProps {
  children: ReactNode
}

export const StructureForm = ({ children }: StructureFormProps) => {
  const methods = useForm<StructureDataState>()
  const dispatch = useAppDispatch()

  const { getValues, watch, reset } = methods

  const [modified, setModified] = useState(false)

  const changeStructureValueDebounced = useDebouncedCallback((fieldId, value) => {
    dispatch(changeStructureValue({ fieldId, value: copy(value) }))
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
        const fieldId = name
        const value = data?.[fieldId]
        changeStructureValueDebounced(fieldId, value)
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
    (fieldId: string, defaultValue: any) => {
      defaultValuesRef.current[fieldId] = copy(defaultValue)
      initializeStructureReportDataDebounced()
    },
    [initializeStructureReportDataDebounced]
  )

  const unregisterDefaultValue = useCallback((fieldId: string) => {
    delete defaultValuesRef.current[fieldId]
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
    const state = dispatch(undoAndSelect())
    reset(copy(state))
    setModified(true)
  }, [changeStructureValueDebounced, dispatch, reset])

  const redo = useCallback(() => {
    changeStructureValueDebounced.flush()
    const state = dispatch(redoAndSelect())
    reset(copy(state))
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
        <Flex component="form" pos="relative" h="100%" direction="column">
          {children}
        </Flex>
        {/* TODO: see https://github.com/react-hook-form/devtools/issues/141 */}
        {/* {config.reactHookFormDevToolsEnabled && (
          <DevTool placement="top-right" control={methods?.control} />
        )} */}
      </FormProvider>
    </StructureFormContextProvider>
  )
}
