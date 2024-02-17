import { Button, Modal } from "@mantine/core"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { TemplatePropertiesForm } from "./TemplatePropertiesForm"

interface TemplatePropertiesModalProps {
  opened: boolean
  onClose: () => void
}

export const TemplatePropertiesModal = ({ opened, onClose }: TemplatePropertiesModalProps) => {
  const { t } = useSiteTranslation()
  return (
    <Modal opened={opened} onClose={onClose} title="New Template - Properties">
      <TemplatePropertiesForm />
      <Button onClick={onClose} mt={16}>
        {t("general.buttonClose")}
      </Button>
    </Modal>
  )
}
