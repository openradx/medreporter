import { ActionIcon } from "@mantine/core"
import { MdRedo as RedoIcon } from "react-icons/md"
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
