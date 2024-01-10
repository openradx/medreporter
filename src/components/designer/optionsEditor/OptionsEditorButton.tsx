import { Input } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsEditorModal } from "./OptionsEditorModal"

interface OptionsEditorProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsEditorButton = ({ node }: OptionsEditorProps) => {
  const { t } = useSiteTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Input component="button" type="button" onClick={open} pointer>
        {/* OptionsEditorButton.label can't be found by i18n Ally as it is pluralized */}
        {t("OptionsEditorButton.label", { count: node.options.length })}
      </Input>
      {opened && <OptionsEditorModal opened={opened} onClose={close} node={node} />}
    </>
  )
}
