import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { Eraser as ClearAllIcon } from "lucide-react"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch } from "~/state/store"
import { clearHistory } from "~/state/structureHistoryDataSlice"
import { resetTemplate } from "~/state/templateSlice"
import { setStructureData } from "~/state/thunks"

export const ClearAllButton = () => {
  const { t } = useLingui()
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t`Clear form`}
      variant="default"
      // disabled={!modified}
      onClick={() => {
        dispatch(setStructureData({}))
        dispatch(clearHistory())
        dispatch(resetTemplate({}))
        dispatch(setSelectedItem(null))
      }}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
