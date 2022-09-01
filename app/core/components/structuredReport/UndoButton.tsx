import { ActionIcon } from "@mantine/core"
import { MdUndo } from "react-icons/md"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const UndoButton = () => {
  const { t } = useSiteTranslation()
  const { canUndo, undo } = useStructureForm()

  return (
    <ActionIcon
      title={t("UndoButton.button_undo")}
      variant="default"
      disabled={!canUndo}
      onClick={() => undo()}
      aria-label="Undo"
    >
      <MdUndo size={20} />
    </ActionIcon>
  )
}
