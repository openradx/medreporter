import { Plural } from "@lingui/react/macro"
import { Input } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsEditorModal } from "./OptionsEditorModal"

interface OptionsEditorButtonProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsEditorButton = ({ node }: OptionsEditorButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Input component="button" type="button" onClick={open} pointer>
        {node.options.length + " "}
        <Plural value={node.options.length} one="Option" other="Options" />
      </Input>
      {opened && <OptionsEditorModal opened={opened} onClose={close} />}
    </>
  )
}
