import { useCallback, useEffect, useRef } from "react"
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
  const fieldNode = useFieldNode()
  const { defaultValuesRef, backupValuesRef } = useStructure()
  const isInitialized = useRef(false)

  let value = useAppSelector(selectStructureLiveValue(fieldId))
  if (value === undefined && fieldNode) value = backupValuesRef.current[fieldNode.node.nodeId]
  if (value === undefined) value = defaultValue

  useEffect(() => {
    if (!isInitialized.current) {
      defaultValuesRef.current[fieldId] = defaultValue

      dispatch(changeStructureLiveValue({ fieldId, value }))
      dispatch(changeStructureHistoryValue({ fieldId, value }, false))
    }

    return () => {
      dispatch(removeStructureLiveValue({ fieldId }))
      dispatch(removeStructureHistoryValue({ fieldId }, false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useCallback(
    (newValue: T) => {
      dispatch(changeStructureValue(fieldId, newValue))
      if (fieldNode) {
        backupValuesRef.current[fieldNode.node.nodeId] = newValue
      }
    },
    [dispatch, fieldId, backupValuesRef, fieldNode]
  )

  return { value: value as T, onChange: handleChange }
}
