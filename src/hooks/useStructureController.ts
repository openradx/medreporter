import { useCallback, useEffect } from "react"
import { useFieldNode } from "~/contexts/FieldNodeContext"
import { useStructure } from "~/contexts/StructureContext"
import { StructureValue } from "~/schemas/structure"
import { useAppDispatch, useAppSelector } from "~/state/store"
import {
  changeStructureHistoryValue,
  removeStructureHistoryValue,
} from "~/state/structureHistoryDataSlice"
import {
  changeStructureLiveValue,
  removeStructureLiveValue,
  selectStructureLiveValue,
} from "~/state/structureLiveDataSlice"
import { changeStructureValue } from "~/state/thunks"

export const useStructureController = <T extends StructureValue>({
  fieldId,
  defaultValue,
}: {
  fieldId: string
  defaultValue: T
}): { value: T; onChange: (value: T) => void } => {
  const dispatch = useAppDispatch()
  const { backupValuesRef, defaultValuesRef } = useStructure()
  const liveValue = useAppSelector(selectStructureLiveValue(fieldId))
  const fieldNode = useFieldNode()

  useEffect(() => {
    defaultValuesRef.current[fieldId] = defaultValue
  }, [fieldId, defaultValue, defaultValuesRef])

  useEffect(() => {
    let initialValue = liveValue
    if (fieldNode) {
      initialValue = backupValuesRef.current[fieldNode.node.nodeId]
    }
    if (initialValue === undefined) initialValue = defaultValue

    dispatch(changeStructureLiveValue({ fieldId, value: initialValue }))
    dispatch(changeStructureHistoryValue({ fieldId, value: initialValue }, false))

    return () => {
      dispatch(removeStructureLiveValue({ fieldId }))
      dispatch(removeStructureHistoryValue({ fieldId }, false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fieldId, defaultValue, fieldNode])

  const handleChange = useCallback(
    (newValue: T) => {
      dispatch(changeStructureValue(fieldId, newValue))

      if (fieldNode) {
        backupValuesRef.current[fieldNode.node.nodeId] = newValue
      }
    },
    [dispatch, fieldId, fieldNode, backupValuesRef]
  )

  return { value: liveValue as T, onChange: handleChange }
}
