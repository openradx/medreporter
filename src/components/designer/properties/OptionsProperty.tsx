import { Input } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useSiteTranslation } from "~/hooks/useSiteTranslation"
import { MultipleChoiceFieldNode, SingleChoiceFieldNode } from "~/schemas/structure"
import { OptionsEditorButton } from "../optionsEditor/OptionsEditorButton"

interface OptionsPropertyProps {
  node: SingleChoiceFieldNode | MultipleChoiceFieldNode
}
export const OptionsProperty = ({ node }: OptionsPropertyProps) => {
  const { t } = useSiteTranslation()
  return (
    <Controller
      name="options"
      render={({ fieldState: { error } }) => (
        <Input.Wrapper label={t("OptionsProperty.label")} error={error?.message}>
          <OptionsEditorButton node={node} />
        </Input.Wrapper>
      )}
    />
  )
}
