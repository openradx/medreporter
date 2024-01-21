import { Box, Flex, Modal, ScrollArea, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MarkdownCodeEditor } from "./MarkdownCodeEditor"
import classes from "./MarkdownEditorModal.module.css"
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
    <Modal
      size="lg"
      title={
        <Flex p="xs" pos="relative">
          {t("MarkdownEditorModal.modalTitle")}
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <SegmentedControl
              value={panel}
              onChange={setPanel as any}
              data={[
                { value: "editor", label: t("MarkdownEditorModal.editorLabel") },
                { value: "preview", label: t("MarkdownEditorModal.previewLabel") },
              ]}
            />
          </Box>
        </Flex>
      }
      opened={opened}
      onClose={onClose}
      classNames={{
        title: classes.markdownEditorModalTitle,
        body: classes.markdownEditorModalBody,
        content: classes.markdownEditorContent,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {panel === "editor" && <MarkdownCodeEditor value={value} onChange={onChange} />}
      {panel === "preview" && <MarkdownPreview value={value} />}
    </Modal>
  )
}
