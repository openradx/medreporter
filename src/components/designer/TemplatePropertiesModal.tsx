import { Modal } from "@mantine/core"
import { TemplatePropertiesForm } from "./TemplatePropertiesForm"

interface TemplatePropertiesModalProps {
  opened: boolean
  onClose: () => void
}

export const TemplatePropertiesModal = ({ opened, onClose }: TemplatePropertiesModalProps) => (
  <Modal
    opened={opened}
    onClose={onClose}
    title="New Template - Properties"
    closeOnClickOutside={false}
    closeOnEscape={false}
    withCloseButton={false}
  >
    <TemplatePropertiesForm onClose={onClose} />
  </Modal>
)
