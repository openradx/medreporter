import { useLingui } from "@lingui/react/macro"
import { Input } from "@mantine/core"
import { Controller } from "react-hook-form"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsEditorButton } from "../optionsEditor/OptionsEditorButton"

interface OptionsPropertyProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}

export const OptionsProperty = ({ node }: OptionsPropertyProps) => {
  const { t } = useLingui()

  return (
    <Controller
      name="options"
      render={({ fieldState: { error } }) => (
        <Input.Wrapper label={t`Options`} error={error?.message}>
          <OptionsEditorButton node={node} />
        </Input.Wrapper>
      )}
    />
  )
}
