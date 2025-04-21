import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Code as CodeIcon } from "lucide-react"
import { memo } from "react"
import { MarkdownEditorModal } from "./MarkdownEditorModal"

interface MarkdownEditorButtonProps {
  value: string
  onChange: (value: string) => void
}

export const MarkdownEditorButton = memo(({ value, onChange }: MarkdownEditorButtonProps) => {
  const { t } = useLingui()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        size="sm"
        variant="subtle"
        title={t`Markdown editor`}
        onClick={open}
        aria-label="Open markdown editor"
      >
        <CodeIcon size={18} />
      </ActionIcon>
      <MarkdownEditorModal opened={opened} onClose={close} value={value} onChange={onChange} />
    </>
  )
})
