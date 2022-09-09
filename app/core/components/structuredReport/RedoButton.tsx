import { ActionIcon } from "@mantine/core"
import { MdRedo } from "react-icons/md"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const RedoButton = () => {
  const { t } = useSiteTranslation()
  const { canRedo, redo } = useStructureForm()

  return (
    <ActionIcon
      title={t("RedoButton.buttonRedo")}
      variant="default"
      disabled={!canRedo}
      onClick={() => redo()}
      aria-label="Redo"
    >
      <MdRedo size={20} />
    </ActionIcon>
  )
}
