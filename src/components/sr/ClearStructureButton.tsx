import { ActionIcon } from "@mantine/core"
import { AiOutlineClear } from "react-icons/ai"
import { useStructureForm } from "~/contexts/StructureFormContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const ClearStructureButton = () => {
  const { t } = useSiteTranslation()
  const { modified, clearForm } = useStructureForm()

  return (
    <ActionIcon
      title={t("ClearStructureButton.buttonClearStructure")}
      variant="default"
      disabled={!modified}
      onClick={clearForm}
      aria-label="Clear form"
    >
      <AiOutlineClear size={20} />
    </ActionIcon>
  )
}
