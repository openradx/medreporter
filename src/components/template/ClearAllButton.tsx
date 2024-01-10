import { ActionIcon } from "@mantine/core"
import { AiOutlineClear as ClearAllIcon } from "react-icons/ai"
import { useStructureForm } from "~/contexts/StructureFormContext"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const ClearAllButton = () => {
  const { t } = useSiteTranslation()
  const { modified, clearForm } = useStructureForm()

  return (
    <ActionIcon
      title={t("ClearAllButton.title")}
      variant="default"
      disabled={!modified}
      onClick={clearForm}
      aria-label="Clear form"
    >
      <ClearAllIcon size={20} />
    </ActionIcon>
  )
}