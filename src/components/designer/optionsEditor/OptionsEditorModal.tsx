import { useLingui } from "@lingui/react/macro"
import { Box, Flex, Modal, ScrollArea, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { EditorModalTitle } from "../EditorModalTitle"
import { OptionsCodeEditor } from "./OptionsCodeEditor"
import classes from "./OptionsEditorModal.module.css"
import { OptionsFormEditor } from "./OptionsFormEditor"

interface OptionsEditorModalProps {
  opened: boolean
  onClose: () => void
}

export const OptionsEditorModal = ({ opened, onClose }: OptionsEditorModalProps) => {
  const { t } = useLingui()
  const [panel, setPanel] = useState<"formEditor" | "codeEditor">("formEditor")

  return (
    <Modal
      size="xl"
      title={
        <Flex p="xs" pos="relative">
          <EditorModalTitle
            title={t`Options`}
            info={t`Edit your options directly or give them as an object in the code editor.`}
          />
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <SegmentedControl
              value={panel}
              onChange={(value) => setPanel(value as any)}
              data={[
                { value: "formEditor", label: t`Form editor` },
                { value: "codeEditor", label: t`Code editor` },
              ]}
            />
          </Box>
        </Flex>
      }
      opened={opened}
      onClose={onClose}
      classNames={{
        title: classes.optionsEditorModalTitle,
        body: classes.optionsEditorModalBody,
        content: classes.optionsEditorContent,
      }}
      scrollAreaComponent={panel === "formEditor" ? ScrollArea.Autosize : undefined}
    >
      <Box display={panel === "formEditor" ? "block" : "none"}>
        <OptionsFormEditor />
      </Box>
      <Box display={panel === "codeEditor" ? "flex" : "none"} h="100%">
        <OptionsCodeEditor />
      </Box>
    </Modal>
  )
}
