import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Code as CodeIcon } from "lucide-react"
import { memo } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { ScriptEditorModal } from "./ScriptEditorModal"

interface ScriptEditorButtonProps {
  modalTitle: string
  modalDescription: string
  value: string
  onChange: (value: string) => void
}

export const ScriptEditorButton = memo(
  ({ modalTitle, modalDescription, value, onChange }: ScriptEditorButtonProps) => {
    const { t } = useSiteTranslation()
    const [opened, { open, close }] = useDisclosure(false)

    return (
      <>
        <ActionIcon
          color="red"
          size="sm"
          variant="subtle"
          title={t("ScriptEditorButton.buttonTooltip")}
          onClick={open}
          aria-label="Open script editor"
        >
          <CodeIcon size={18} />
        </ActionIcon>
        <ScriptEditorModal
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
