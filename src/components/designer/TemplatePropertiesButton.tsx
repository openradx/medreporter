import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ClipboardList as TemplatePropertiesIcon } from "lucide-react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TemplatePropertiesModal } from "./TemplatePropertiesModal"

export const TemplatePropertiesButton = () => {
  const [opened, { open, close }] = useDisclosure(false) // TODO: default true for production
  const { t } = useSiteTranslation()

  return (
    <>
      <ActionIcon
        title={t("TemplatePropertiesButton.title")}
        variant="default"
        onClick={open}
        aria-label="Open template properties modal"
        size="md"
      >
        <TemplatePropertiesIcon size={20} />
      </ActionIcon>
      <TemplatePropertiesModal opened={opened} onClose={close} />
    </>
  )
}
