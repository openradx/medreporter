import { ActionIcon } from "@mantine/core"
import { AiOutlineClear } from "react-icons/ai"
import { useSiteTranslation } from "app/core/hooks/useSiteTranslation"
import { useStructureForm } from "../../contexts/StructureFormContext"

export const ClearStructureButton = () => {
  const { t } = useSiteTranslation()
  const { modified, clearForm } = useStructureForm()

  return (
    <ActionIcon
      title={t("ClearStructureButton.actionTitle")}
      variant="default"
      disabled={!modified}
      onClick={clearForm}
      aria-label="Clear form"
    >
      <AiOutlineClear size={20} />
    </ActionIcon>
  )
}
