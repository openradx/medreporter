import { useCallback, useEffect } from "react"
import { useStructure } from "~/contexts/StructureContext"
import { StructureValue } from "~/schemas/structure"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { changeStructureHistoryValue } from "~/state/structureHistoryDataSlice"
import { changeStructureLiveValue, selectStructureLiveValue } from "~/state/structureLiveDataSlice"
import { changeStructureValue, removeStructureValue } from "~/state/thunks"

export const useStructureController = <T extends StructureValue>({
  fieldId,
  defaultValue,
}: {
  fieldId: string
  defaultValue: T
}): { value: T; onChange: (value: T) => void } => {
  const dispatch = useAppDispatch()
  let value = useAppSelector(selectStructureLiveValue(fieldId))
  if (value === undefined) value = defaultValue

  useEffect(() => {
    dispatch(changeStructureLiveValue({ fieldId, value: defaultValue }))
    dispatch(changeStructureHistoryValue({ fieldId, value: defaultValue }, { undoable: false }))
    return () => {
      dispatch(removeStructureValue(fieldId))
    }
  }, [dispatch, fieldId, defaultValue])

  const { defaultValuesRef } = useStructure()

  useEffect(() => {
    defaultValuesRef.current[fieldId] = defaultValue
  }, [defaultValuesRef, fieldId, defaultValue])

  const handleChange = useCallback(
    (newValue: T) => {
      dispatch(changeStructureValue(fieldId, newValue))
    },
    [dispatch, fieldId]
  )

  return { value: value as T, onChange: handleChange }
}
