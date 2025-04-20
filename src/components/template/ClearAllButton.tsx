import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Eraser as ClearAllIcon } from "lucide-react"
import { useStructure } from "~/contexts/StructureContext"
import { selectStructureDataModified, setStructureDataModified } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { changeHistoryDebounced, setStructureData } from "~/state/thunks"

export const ClearAllButton = () => {
  const { t } = useLingui()
  const { defaultValuesRef } = useStructure()
  const modified = useAppSelector(selectStructureDataModified)
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t`Clear all`}
      variant="default"
      disabled={!modified}
      onClick={() => {
        changeHistoryDebounced.flush()
        const structureData = defaultValuesRef.current
        dispatch(setStructureData(structureData))
        dispatch(setStructureDataModified(true))
      }}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
