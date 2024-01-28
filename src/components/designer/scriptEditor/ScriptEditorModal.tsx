import { Modal } from "@mantine/core"
import { EditorModalTitle } from "../ModalHeader"
import { ScriptEditor } from "../editors/ScriptEditor"

interface ScriptEditorModalProps {
  title: string
  description: string
  opened: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}

export const ScriptEditorModal = ({
  title,
  description,
  opened,
  onClose,
  value,
  onChange,
}: ScriptEditorModalProps) => (
  <Modal
    size="xl"
    title={<EditorModalTitle title={title} info={description} />}
    opened={opened}
    onClose={onClose}
  >
    <ScriptEditor value={value} onChange={onChange} />
  </Modal>
)
