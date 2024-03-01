import { ActionIcon } from "@mantine/core"
import { AiOutlineClear as ClearAllIcon } from "react-icons/ai"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch } from "~/state/store"
import { resetStructureData } from "~/state/structureDataSlice"
import { resetTemplate } from "~/state/templateSlice"

export const ClearAllButton = () => {
  const { t } = useSiteTranslation()
  const dispatch = useAppDispatch()
  return (
    <ActionIcon
      title={t("ClearAllButton.title")}
      variant="default"
      // disabled={!modified}
      onClick={() => {
        dispatch(resetStructureData())
        dispatch(resetTemplate({}))
        dispatch(setSelectedItem(null))
      }}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
