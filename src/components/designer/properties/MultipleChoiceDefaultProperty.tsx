import { useLingui } from "@lingui/react/macro"
import { MultipleChoiceFieldNode } from "~/schemas/structure"
import { MultiSelectPropertyInput } from "./MultiSelectPropertyInput"

interface MultipleChoiceDefaultPropertyProps {
  node: MultipleChoiceFieldNode
}

export const MultipleChoiceDefaultProperty = ({ node }: MultipleChoiceDefaultPropertyProps) => {
  const { t } = useLingui()

  return <MultiSelectPropertyInput name="default" label={t`Default`} node={node} />
}
