import { Modal } from "@mantine/core"
import { EditorModalTitle } from "../ModalHeader"
import { ScriptEditor } from "../editors/ScriptEditor"
import classes from "./ScriptEditorModal.module.css"

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
    classNames={{
      title: classes.scriptEditorModalTitle,
      body: classes.scriptEditorModalBody,
      content: classes.scriptEditorContent,
      header: classes.scriptEditorModalHeader,
    }}
  >
    <ScriptEditor value={value} onChange={onChange} />
  </Modal>
)
