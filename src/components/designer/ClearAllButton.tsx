import { ActionIcon } from "@mantine/core"
import { AiOutlineClear as ClearAllIcon } from "react-icons/ai"
import { useDesigner } from "~/contexts/DesignerContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { setSelectedItem } from "~/state/designerSlice"
import { useAppDispatch } from "~/state/store"
import { resetTemplate } from "~/state/templateSlice"

export const ClearAllButton = () => {
  const { t } = useSiteTranslation()
  const dispatch = useAppDispatch()
  const designer = useDesigner()

  return (
    <ActionIcon
      title={t("ClearAllButton.title")}
      variant="default"
      // disabled={!modified}
      onClick={() => {
        designer?.structureFormRef.current?.resetAllFields()
        dispatch(resetTemplate({}))
        dispatch(setSelectedItem(null))
      }}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}
