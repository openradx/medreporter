import { useLingui } from "@lingui/react/macro"
import { Modal, ScrollArea } from "@mantine/core"
import { TemplatePropertiesForm } from "./TemplatePropertiesForm"

interface TemplatePropertiesModalProps {
  opened: boolean
  onClose: () => void
}

export const TemplatePropertiesModal = ({ opened, onClose }: TemplatePropertiesModalProps) => {
  const { t } = useLingui()
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t`Template properties`}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <TemplatePropertiesForm onClose={onClose} />
    </Modal>
  )
}
