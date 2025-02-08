import { ActionIcon } from "@mantine/core"
import { Pencil as EditIcon } from "lucide-react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"

export const EditTemplateButton = () => {
  const { t } = useSiteTranslation()
  return (
    <ActionIcon
      title={t("EditTemplateButton.title")}
      variant="default"
      aria-label="Edit template"
      size="md"
    >
      <EditIcon size={20} />
    </ActionIcon>
  )
}
