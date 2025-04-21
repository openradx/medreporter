import { useLingui, Trans } from "@lingui/react/macro"
import { Box, Flex, Modal, SegmentedControl } from "@mantine/core"
import { useState } from "react"
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
  const { t } = useLingui()
  const [panel, setPanel] = useState<"editor" | "preview">("editor")

  return (
    <Modal
      size="xl"
      title={
        <Flex p="xs" pos="relative">
          <Trans>SVG Editor</Trans>
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <SegmentedControl
              value={panel}
              onChange={setPanel as any}
              data={[
                { value: "editor", label: t`Editor` },
                { value: "preview", label: t`Preview` },
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
    >
      <Box display={panel === "editor" ? "flex" : "none"} h="100%">
        <SvgEditor value={value} onChange={onChange} />
      </Box>
      <Box display={panel === "preview" ? "block" : "none"}>
        <SvgPreview value={value} />
      </Box>
    </Modal>
  )
}
