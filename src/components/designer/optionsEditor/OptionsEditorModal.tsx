import { Box, Flex, Modal, ScrollArea, SegmentedControl } from "@mantine/core"
import { useState } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsCodeEditor } from "./OptionsCodeEditor"
import classes from "./OptionsEditorModal.module.css"
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
    <Modal
      size="xl"
      title={
        <Flex p="xs" pos="relative">
          {t("OptionsEditorModal.modalTitle")}
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <SegmentedControl
              value={panel}
              onChange={(value) => setPanel(value as any)}
              data={[
                { value: "formEditor", label: t("OptionsEditorModal.formEditorLabel") },
                { value: "codeEditor", label: t("OptionsEditorModal.codeEditorLabel") },
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
        <OptionsFormEditor node={node} />
      </Box>
      <Box display={panel === "codeEditor" ? "flex" : "none"} h="100%">
        <OptionsCodeEditor node={node} />
      </Box>
    </Modal>
  )
}
