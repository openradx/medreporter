import { ActionIcon } from "@mantine/core"
import { Undo as UndoIcon } from "lucide-react"
import { useStructureForm } from "~/contexts/StructureFormContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const UndoButton = () => {
  const { t } = useSiteTranslation()
  const { canUndo, undo } = useStructureForm()

  return (
    <ActionIcon
      title={t("UndoButton.title")}
      variant="default"
      disabled={!canUndo}
      onClick={() => undo()}
      aria-label="Undo"
    >
      <UndoIcon size={20} />
    </ActionIcon>
  )
}
