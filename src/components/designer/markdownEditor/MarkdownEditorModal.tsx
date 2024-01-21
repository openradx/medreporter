import { Group, Modal, SegmentedControl, Stack } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MarkdownCodeEditor } from "./MarkdownCodeEditor"
import { MarkdownPreview } from "./MarkdownPreview"

interface MarkdownEditorModalProps {
  opened: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}

export const MarkdownEditorModal = ({
  opened,
  onClose,
  value,
  onChange,
}: MarkdownEditorModalProps) => {
  const { t } = useSiteTranslation()
  const [panel, setPanel] = useState<"editor" | "preview">("editor")

  return (
    <Modal size="lg" title={t("MarkdownEditorModal.modalTitle")} opened={opened} onClose={onClose}>
      <Stack gap="xs">
        <Group justify="center">
          <SegmentedControl
            value={panel}
            onChange={setPanel as any}
            data={[
              { value: "editor", label: t("MarkdownEditorModal.editorLabel") },
              { value: "preview", label: t("MarkdownEditorModal.previewLabel") },
            ]}
          />
        </Group>
        {panel === "editor" && <MarkdownCodeEditor value={value} onChange={onChange} />}
        {panel === "preview" && <MarkdownPreview value={value} />}
      </Stack>
    </Modal>
  )
}
