import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { memo } from "react"
import { MdCode as CodeIcon } from "react-icons/md"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MarkdownEditorModal } from "./MarkdownEditorModal"

interface MarkdownEditorButtonProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownEditorButton = memo(({ value, onChange }: MarkdownEditorButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        size="sm"
        variant="subtle"
        title={t("MarkdownEditorButton.buttonTooltip")}
        onClick={open}
        aria-label="Open markdown editor"
      >
        <CodeIcon size={20} />
      </ActionIcon>
      <MarkdownEditorModal opened={opened} onClose={close} value={value} onChange={onChange} />
    </>
  )
})
