import { Box, Flex, Modal, SegmentedControl, Stack } from "@mantine/core"
import { Controller, useWatch } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { EditorModalTitle } from "../EditorModalTitle"
import { CodeEditor } from "../editors/CodeEditor"
import { ScriptEditor } from "../editors/ScriptEditor"
import classes from "./ContentEditorModal.module.css"

interface ContentEditorModalProps {
  title: string
  description: string
  opened: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}

export const ContentEditorModal = ({
  title,
  description,
  opened,
  onClose,
  value,
  onChange,
}: ContentEditorModalProps) => {
  const { t } = useSiteTranslation()
  const contentType = useWatch({ name: "content.contentType" })

  return (
    <Modal
      size="xl"
      title={
        <Flex p="xs" pos="relative">
          <EditorModalTitle title={title} info={description} />
          <Box pos="absolute" top="50%" left="50%" style={{ transform: "translate(-50%, -50%)" }}>
            <Controller
              name="content.contentType"
              render={({ field: { value: panel, onChange: onSwitch } }) => (
                <SegmentedControl
                  size="xs"
                  data={[
                    { label: t("ContentProperty.labelCode"), value: "code" },
                    { label: t("ContentProperty.labelText"), value: "text" },
                  ]}
                  value={panel}
                  onChange={onSwitch}
                />
              )}
            />
          </Box>
        </Flex>
      }
      opened={opened}
      onClose={onClose}
      classNames={{
        title: classes.scriptEditorModalTitle,
        body: classes.scriptEditorModalBody,
        content: classes.scriptEditorContent,
        header: classes.scriptEditorModalHeader,
      }}
    >
      <Box display={contentType === "code" ? "block" : "none"} h="100%">
        <ScriptEditor value={value} onChange={onChange} />
      </Box>
      <Box display={contentType === "text" ? "block" : "none"} h="100%">
        <Stack h="100%" w="100%" gap={0} className={classes.stringEditor}>
          <CodeEditor codeType="string" extensions={[]} value={value} onChange={onChange} />
        </Stack>
      </Box>
    </Modal>
  )
}
