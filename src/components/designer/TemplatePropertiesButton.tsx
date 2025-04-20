import { useLingui } from "@lingui/react/macro"
import { ActionIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ClipboardList as TemplatePropertiesIcon } from "lucide-react"
import { TemplatePropertiesModal } from "./TemplatePropertiesModal"

export const TemplatePropertiesButton = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { t } = useLingui()

  return (
    <>
      <ActionIcon
        title={t`Template properties`}
        variant="default"
        onClick={open}
        aria-label="Open template properties modal"
        size="md"
      >
        <TemplatePropertiesIcon size={20} />
      </ActionIcon>
      <TemplatePropertiesModal opened={opened} onClose={close} />
    </>
  )
}
