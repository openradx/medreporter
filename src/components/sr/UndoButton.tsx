import { ActionIcon } from "@mantine/core"
import { MdUndo } from "react-icons/md"
import { useStructureForm } from "~/contexts/StructureFormContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const UndoButton = () => {
  const { t } = useSiteTranslation()
  const { canUndo, undo } = useStructureForm()

  return (
    <ActionIcon
      title={t("UndoButton.buttonUndo")}
      variant="default"
      disabled={!canUndo}
      onClick={() => undo()}
      aria-label="Undo"
    >
      <MdUndo size={20} />
    </ActionIcon>
  )
}
