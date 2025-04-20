import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Code as CodeIcon } from "lucide-react"
import { memo } from "react"
import { SvgEditorModal } from "./SvgEditorModal"

interface SvgEditorButtonProps {
  value: string
  onChange: (value: string) => void
}

export const SvgEditorButton = memo(({ value, onChange }: SvgEditorButtonProps) => {
  const { t } = useLingui()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ActionIcon color="green" size="sm" variant="subtle" title={t`SVG Editor`} onClick={open}>
        <CodeIcon size={18} />
      </ActionIcon>
      <SvgEditorModal opened={opened} onClose={close} value={value} onChange={onChange} />
    </>
  )
})
