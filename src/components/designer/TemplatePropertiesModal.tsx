import { Modal } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TemplatePropertiesForm } from "./TemplatePropertiesForm"

interface TemplatePropertiesModalProps {
  opened: boolean
  onClose: () => void
}

export const TemplatePropertiesModal = ({ opened, onClose }: TemplatePropertiesModalProps) => {
  const { t } = useSiteTranslation()
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t("TemplatePropertiesModal.modalTitle")}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
    >
      <TemplatePropertiesForm onClose={onClose} />
    </Modal>
  )
}
