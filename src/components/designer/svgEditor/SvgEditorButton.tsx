import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { memo } from "react"
import { MdCode as CodeIcon } from "react-icons/md"
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
        <CodeIcon size={20} />
      </ActionIcon>
      <SvgEditorModal opened={opened} onClose={close} value={value} onChange={onChange} />
    </>
  )
})
