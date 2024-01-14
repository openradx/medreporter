import { Group, Modal, SegmentedControl, Stack } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsCodeEditor } from "./OptionsCodeEditor"
import { OptionsFormEditor } from "./OptionsFormEditor"

interface OptionsEditorModalProps {
  opened: boolean
  onClose: () => void
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsEditorModal = ({ opened, onClose, node }: OptionsEditorModalProps) => {
  const { t } = useSiteTranslation()
  const [panel, setPanel] = useState<"formEditor" | "codeEditor">("formEditor")

  return (
    <Modal size="lg" title={t("OptionsEditorModal.modalTitle")} opened={opened} onClose={onClose}>
      <Stack gap="xs">
        <Group justify="center">
          <SegmentedControl
            value={panel}
            onChange={(value) => setPanel(value as any)}
            data={[
              { value: "formEditor", label: t("OptionsEditorModal.formEditorLabel") },
              { value: "codeEditor", label: t("OptionsEditorModal.codeEditorLabel") },
            ]}
          />
        </Group>
        {panel === "formEditor" && <OptionsFormEditor node={node} />}
        {panel === "codeEditor" && <OptionsCodeEditor node={node} />}
      </Stack>
    </Modal>
  )
}
