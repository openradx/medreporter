import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import copy from "fast-copy"
import { Eraser as ClearAllIcon } from "lucide-react"
import { useStructure } from "~/contexts/StructureContext"
import { selectStructureDataModified } from "~/state/displaySlice"
import { useAppDispatch, useAppSelector } from "~/state/store"
import { clearStructure } from "~/state/thunks"

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
        dispatch(clearStructure(copy(defaultValuesRef.current)))
      }}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
