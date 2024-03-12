import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Code as CodeIcon } from "lucide-react"
import { memo } from "react"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { SvgEditorModal } from "./SvgEditorModal"

interface SvgEditorButtonProps {
  value: string
  onChange: (value: string) => void
}

export const SvgEditorButton = memo(({ value, onChange }: SvgEditorButtonProps) => {
  const { t } = useSiteTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon
        color="green"
        size="sm"
        variant="subtle"
        title={t("SvgEditorButton.buttonTooltip")}
        onClick={open}
        aria-label="Open SVG editor"
      >
        <CodeIcon size={18} />
      </ActionIcon>
      <SvgEditorModal opened={opened} onClose={close} value={value} onChange={onChange} />
    </>
  )
})
