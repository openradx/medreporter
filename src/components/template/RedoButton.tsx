import { ActionIcon } from "@mantine/core"
import { Redo as RedoIcon } from "lucide-react"
import { useStructureForm } from "~/contexts/StructureFormContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const RedoButton = () => {
  const { t } = useSiteTranslation()
  const { canRedo, redo } = useStructureForm()

  return (
    <ActionIcon
      title={t("RedoButton.title")}
      variant="default"
      disabled={!canRedo}
      onClick={() => redo()}
      aria-label="Redo"
    >
      <RedoIcon size={20} />
    </ActionIcon>
  )
}
