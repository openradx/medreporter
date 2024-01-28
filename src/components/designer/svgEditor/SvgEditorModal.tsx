import { Box, Flex, Modal, ScrollArea, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SvgEditor } from "../editors/SvgEditor"
import classes from "./SvgEditorModal.module.css"
import { SvgPreview } from "./SvgPreview"

interface SvgEditorModalProps {
  opened: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}

export const SvgEditorModal = ({ opened, onClose, value, onChange }: SvgEditorModalProps) => {
  const { t } = useSiteTranslation()
  const [panel, setPanel] = useState<"editor" | "preview">("editor")

  return (
    <Modal
      size="xl"
      title={
        <Flex p="xs" pos="relative">
          {t("SvgEditorModal.modalTitle")}
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <SegmentedControl
              value={panel}
              onChange={setPanel as any}
              data={[
                { value: "editor", label: t("SvgEditorModal.editorLabel") },
                { value: "preview", label: t("SvgEditorModal.previewLabel") },
              ]}
            />
          </Box>
        </Flex>
      }
      opened={opened}
      onClose={onClose}
      classNames={{
        title: classes.markdownEditorModalTitle,
        body: panel === "preview" ? classes.markdownEditorModalBody : undefined,
        content: classes.markdownEditorContent,
      }}
      scrollAreaComponent={panel === "preview" ? ScrollArea.Autosize : undefined}
    >
      <Box display={panel === "editor" ? "block" : "none"}>
        <SvgEditor value={value} onChange={onChange} />
      </Box>
      <Box display={panel === "preview" ? "block" : "none"}>
        <SvgPreview value={value} />
      </Box>
    </Modal>
  )
}
