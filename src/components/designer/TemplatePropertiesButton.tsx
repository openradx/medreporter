import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MdAppRegistration as TemplatePropertiesIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TemplatePropertiesModal } from "./TemplatePropertiesModal"

export const TemplatePropertiesButton = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { t } = useSiteTranslation()

  return (
    <>
      <ActionIcon
        title={t("TemplatePropertiesButton.title")}
        variant="default"
        onClick={open}
        aria-label="Open template properties modal"
      >
        <TemplatePropertiesIcon size={20} />
      </ActionIcon>
      <TemplatePropertiesModal opened={opened} onClose={close} />
    </>
  )
}
