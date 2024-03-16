import { ActionIcon } from "@mantine/core"
import { Eraser as ClearAllIcon } from "lucide-react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch } from "~/state/store"
import { clearHistory } from "~/state/structureHistoryDataSlice"
import { resetTemplate } from "~/state/templateSlice"
import { setStructureData } from "~/state/thunks"

export const ClearAllButton = () => {
  const { t } = useSiteTranslation()
  const dispatch = useAppDispatch()

  return (
    <ActionIcon
      title={t("ClearAllButton.title")}
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
