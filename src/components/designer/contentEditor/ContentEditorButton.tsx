import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Code as CodeIcon } from "lucide-react"
import { memo } from "react"
import { ContentEditorModal } from "./ContentEditorModal"

interface ContentEditorButtonProps {
  modalTitle: string
  modalDescription: string
  value: string
  onChange: (value: string) => void
}

export const ContentEditorButton = memo(
  ({ modalTitle, modalDescription, value, onChange }: ContentEditorButtonProps) => {
    const { t } = useLingui()
    const [opened, { open, close }] = useDisclosure(false)

    return (
      <>
        <ActionIcon
          color="yellow"
          size="sm"
          variant="subtle"
          title={t`Script editor`}
          onClick={open}
          aria-label="Open script editor"
        >
          <CodeIcon size={18} />
        </ActionIcon>
        <ContentEditorModal
          title={modalTitle}
          description={modalDescription}
          opened={opened}
          onClose={close}
          value={value}
          onChange={onChange}
        />
      </>
    )
  }
)
